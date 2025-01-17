import * as cheerio from "cheerio";
import { Etymology } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse($: cheerio.CheerioAPI, skeleton: EntrySectionSkeleton): Etymology | undefined;
