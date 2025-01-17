import * as cheerio from "cheerio";
import { Quotation } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): Quotation[] | undefined;
