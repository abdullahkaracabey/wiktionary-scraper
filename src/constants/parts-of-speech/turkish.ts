import { PartOfSpeech } from "../../types.js";
import { reverseObject } from "../../utils.js";

export default reverseObject({
	adposition: "Adposition",
	affix: "Affix",
	character: "Character",
	// Standard parts of speech
	number: "Number",
	symbol: "Symbol",
	adjective: "Adjective",
	adverb: "Adverb",
	ambiposition: "Ambiposition",
	article: "Article",
	circumposition: "Circumposition",
	classifier: "Classifier",
	conjunction: "Conjunction",
	contraction: "Contraction",
	counter: "Counter",
	determiner: "Determiner",
	ideophone: "Ideophone",
	interjection: "Interjection",
	noun: "Ad",
	numeral: "Numeral",
	participle: "Participle",
	particle: "Particle",
	postposition: "Postposition",
	preposition: "Preposition",
	pronoun: "Pronoun",
	"proper-noun": "Proper noun",
	verb: "Eylem",
	circumfix: "Circumfix",
	"combining-form": "Combining form",
	infix: "Infix",
	interfix: "Interfix",
	prefix: "Prefix",
	root: "Kök",
	suffix: "Suffix",
	"diacritical-mark": "Diacritical mark",
	letter: "Letter",
	ligature: "Ligature",
	"punctuation-mark": "Punctuation mark",
	syllable: "Syllable",
	phrase: "Phrase",
	proverb: "Proverb",
	"prepositional-phrase": "Prepositional phrase",
	"han-character": "Han character",
	hanzi: "Hanzi",
	kanji: "Kanji",
	hanja: "Hanja",
	romanization: "Romanization",
	logogram: "Logogram",
	determinative: "Determinative",
	// Disallowed parts of speech
	abbreviation: "Abbreviation",
	acronym: "Acronym",
	initialism: "Initialism",
	"cardinal-number": "Cardinal number",
	"ordinal-number": "Ordinal number",
	"cardinal-numeral": "Cardinal numeral",
	"ordinal-numeral": "Ordinal numeral",
	clitic: "Clitic",
	gerund: "Gerund",
	idiom: "Idiom",
} satisfies Record<PartOfSpeech, string> as Record<PartOfSpeech, string>);
