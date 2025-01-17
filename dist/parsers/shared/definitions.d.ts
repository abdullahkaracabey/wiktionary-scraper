import * as cheerio from "cheerio";
import { Definition } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse($: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton): Definition[] | undefined;
