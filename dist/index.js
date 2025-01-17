import * as cheerio from "cheerio";
import links from "./constants/links.js";
import selectors from "./constants/selectors.js";
import { parse } from "./parsers/parser.js";
const defaultScraperOptions = {
    lemmaLanguage: "English",
    siteLanguage: "en",
    userAgent: "wiktionary-scraper (github.com/vxern/wiktionary-scraper)",
    followRedirect: false,
    links,
};
export async function get(lemma, options = defaultScraperOptions) {
    const optionsFilled = {
        ...defaultScraperOptions,
        ...options,
        links: { ...defaultScraperOptions.links, ...options.links },
    };
    let response;
    try {
        console.log("fetch", links.definition(lemma, optionsFilled));
        response = await fetch(links.definition(lemma, optionsFilled), {
            headers: optionsFilled.userAgent !== undefined ? { "User-Agent": optionsFilled.userAgent } : {},
        });
    }
    catch {
        return undefined;
    }
    const body = await response.text();
    // console.log("response", body)
    const $ = cheerio.load(body);
    if (!response.ok) {
        if (response.status === 404 && options.followRedirect) {
            const suggestedLemma = $(selectors.didYouMean).html() ?? undefined;
            if (suggestedLemma === undefined) {
                return undefined;
            }
            return get(suggestedLemma, optionsFilled);
        }
        else {
            return undefined;
        }
    }
    return parse(optionsFilled, $, { value: lemma });
}
export * from "./parsers/parser.js";
export * from "./options.js";
export * from "./types.js";
