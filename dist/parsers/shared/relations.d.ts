import * as cheerio from "cheerio";
import { Relation } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Relation[] | undefined;
