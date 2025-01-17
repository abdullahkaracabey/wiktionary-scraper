import { SiteLanguage } from "../options.js";
import english from "./sections/english.js";
import turkish from "./sections/turkish.js";

export default {
	en: english,
	tr: turkish,
} satisfies Record<SiteLanguage, unknown>;
