import { ScraperOptions } from "./options.js";
import { Entry } from "./types.js";
export declare function get(lemma: string, options?: Partial<ScraperOptions>): Promise<Entry[] | undefined>;
export * from "./parsers/parser.js";
export * from "./options.js";
export * from "./types.js";
