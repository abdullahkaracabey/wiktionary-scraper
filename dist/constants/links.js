const links = {
    definition: (word, options) => `https://${options.siteLanguage}.wiktionary.org/wiki/${encodeURIComponent(word)}#${encodeURIComponent(options.lemmaLanguage)}`,
};
export default links;
