import * as cheerio from "cheerio";
import { SeeAlso } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): SeeAlso | undefined;
