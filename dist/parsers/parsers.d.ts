import { Sections } from "../types.js";
import { Parser } from "./parser.js";
type Parsers = {
    [K in keyof Sections]: Parser<Partial<Sections>, K>;
};
declare const _default: Parsers;
export default _default;
