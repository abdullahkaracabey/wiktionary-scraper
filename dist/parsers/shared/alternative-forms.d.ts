import * as cheerio from "cheerio";
import { AlternativeForm } from "../../types.js";
import { EntrySectionSkeleton } from "../parser.js";
export default function parse(_: cheerio.CheerioAPI, __: EntrySectionSkeleton): AlternativeForm[] | undefined;
