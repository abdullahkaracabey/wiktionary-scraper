import * as cheerio from "cheerio";
import { ScraperOptions } from "../options.js";
import { Entry, Lemma, Sections } from "../types.js";
export type Parser<S extends Partial<Sections>, K extends keyof S> = ($: cheerio.CheerioAPI, sectionSkeleton: EntrySectionSkeleton) => S[K];
export interface EntrySectionSkeleton {
    id: string;
    name: string;
    sections: EntrySectionSkeleton[];
}
export declare function parse(options: ScraperOptions, $: cheerio.CheerioAPI, lemma: Lemma): Entry[] | undefined;
