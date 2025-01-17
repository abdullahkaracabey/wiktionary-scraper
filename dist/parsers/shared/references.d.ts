import * as cheerio from "cheerio";
import { Reference } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Reference[] | undefined;
