import partsOfSpeech from "../constants/parts-of-speech.js";
import patterns from "../constants/patterns.js";
import sections from "../constants/sections.js";
import selectors from "../constants/selectors.js";
import { addMissingProperties } from "../utils.js";
import parsers from "./parsers.js";
export function parse(options, $, lemma) {
    const $tableOfContents = $(selectors.tableOfContents.tableOfContents).first();
    const $entries = $tableOfContents.find(selectors.tableOfContents.entries.entries(0));
    const skeletons = [];
    for (const entryElement of $entries) {
        const skeleton = parseSectionSkeleton($, entryElement, 1);
        if (skeleton === undefined) {
            continue;
        }
        skeletons.push(skeleton);
        console.log("skeleton", skeleton);
    }
    const skeletonForLanguage = skeletons.find((skeleton) => skeleton.name === options.lemmaLanguage);
    if (skeletonForLanguage === undefined) {
        return undefined;
    }
    console.log("skeletonForLanguage", skeletonForLanguage);
    return parseEntrySkeleton(options, $, skeletonForLanguage, lemma);
}
function parseSectionSkeleton($, section, depth) {
    const $section = $(section);
    const $root = $section.find(selectors.tableOfContents.entries.root.root).first();
    const id = $root.attr("href");
    if (id === undefined) {
        return undefined;
    }
    const $name = $root.find(selectors.tableOfContents.entries.root.text).first();
    const name = $name.html() ?? undefined;
    if (name === undefined) {
        return undefined;
    }
    const $sections = $section.find(selectors.tableOfContents.entries.entries(depth));
    if ($sections === undefined) {
        return { id, name, sections: [] };
    }
    const sections = [];
    for (const sectionElement of $sections) {
        const section = parseSectionSkeleton($, sectionElement, depth + 1);
        if (section === undefined) {
            continue;
        }
        sections.push(section);
    }
    return { id, name, sections };
}
function parseEntrySkeleton(options, $, skeleton, lemma) {
    const isMultipleEntries = skeleton.sections.some((skeleton) => {
        const [_, sectionName, sectionIndex] = patterns.sectionName.exec(skeleton.name) ?? [];
        if (sectionName === undefined) {
            return false;
        }
        console.log("sectionName", sectionName, options.siteLanguage);
        const sectionType = sections[options.siteLanguage][sectionName];
        // console.log("sections for siteLanguage", sections[options.siteLanguage])
        if (sectionType === undefined) {
            return false;
        }
        console.log("sectionType", sectionType);
        return sectionType === "etymology" && sectionIndex !== undefined;
    });
    console.log("isMultipleEntries", isMultipleEntries);
    if (isMultipleEntries) {
        return parseMultipleEtymologies(options, $, skeleton, lemma);
    }
    const entries = parseSingleEtymology(options, $, skeleton, lemma);
    if (entries === undefined) {
        return [];
    }
    return entries;
}
function parseMultipleEtymologies(options, $, skeleton, lemma) {
    const sectionsMapped = sections[options.siteLanguage];
    const skeletonWithoutEtymologySections = { id: skeleton.id, name: skeleton.name, sections: [] };
    const etymologySections = [];
    for (const sectionSkeleton of skeleton.sections) {
        const [_, sectionName] = patterns.sectionName.exec(sectionSkeleton.name) ?? [];
        if (sectionName === undefined) {
            continue;
        }
        console.log("sectionName", sectionName);
        console.log("sectionsMapped", sectionsMapped);
        const sectionType = sectionsMapped[sectionName];
        if (sectionType === undefined) {
            continue;
        }
        console.log("sectionType", sectionType);
        if (sectionType === "etymology") {
            etymologySections.push(sectionSkeleton);
        }
        else {
            skeletonWithoutEtymologySections.sections.push(sectionSkeleton);
        }
    }
    const topLevelEntries = parseSingleEtymology(options, $, skeletonWithoutEtymologySections, lemma);
    const entries = [];
    for (const etymologySection of etymologySections) {
        const etymology = parsers.etymology($, etymologySection);
        const entriesNew = parseSingleEtymology(options, $, etymologySection, lemma);
        if (entriesNew === undefined) {
            continue;
        }
        if (etymology !== undefined) {
            for (const entry of entriesNew) {
                entry.etymology = etymology;
            }
        }
        entries.push(...entriesNew);
    }
    if (topLevelEntries !== undefined) {
        if (entries.length === 0) {
            return topLevelEntries;
        }
        for (const entry of entries) {
            for (const topLevelEntry of topLevelEntries) {
                addMissingProperties(entry, topLevelEntry);
            }
        }
        return entries;
    }
    else {
        return entries;
    }
}
function parseSingleEtymology(options, $, skeleton, lemma) {
    const sectionsMapped = sections[options.siteLanguage];
    const partsOfSpeechMapped = partsOfSpeech[options.siteLanguage];
    const sectionTuples = [];
    const sectionsUnrecognised = [];
    for (const sectionSkeleton of skeleton.sections) {
        const [_, sectionName] = patterns.sectionName.exec(sectionSkeleton.name) ?? [];
        if (sectionName === undefined) {
            continue;
        }
        const sectionType = sectionsMapped[sectionName];
        if (sectionType === undefined) {
            sectionsUnrecognised.push([sectionName, sectionSkeleton]);
            continue;
        }
        sectionTuples.push([sectionType, undefined, sectionSkeleton]);
    }
    const entrySections = {};
    for (const [sectionType, _, sectionSkeleton] of sectionTuples) {
        if (sectionType in entrySections) {
            continue;
        }
        const parse = parsers[sectionType];
        const section = parse($, sectionSkeleton);
        if (section === undefined) {
            continue;
        }
        // @ts-ignore: This is fine.
        entrySections[sectionType] = section;
    }
    const entries = [];
    for (const [sectionName, skeleton] of sectionsUnrecognised) {
        const partOfSpeech = partsOfSpeechMapped[sectionName];
        if (partOfSpeech === undefined) {
            continue;
        }
        const definitions = parsers.definitions($, skeleton);
        if (definitions === undefined) {
            continue;
        }
        entries.push({ ...entrySections, lemma, partOfSpeech, definitions });
    }
    return entries;
}
