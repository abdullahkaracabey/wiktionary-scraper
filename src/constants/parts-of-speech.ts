import { SiteLanguage } from "../options.js";
import english from "./parts-of-speech/english.js";
import turkish from "./parts-of-speech/turkish.js";

export default {
	en: english,
	tr: turkish,
} satisfies Record<SiteLanguage, unknown>;
