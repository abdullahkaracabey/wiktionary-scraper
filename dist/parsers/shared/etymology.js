import selectors from "../../constants/selectors.js";
import { clean } from "../../utils.js";
export default function parse($, skeleton) {
    const $root = $(skeleton.id);
    const $row = $root.parent();
    const $elements = $row.nextUntil(selectors.section);
    const $paragraphs = $elements.filter((_, element) => element.name === selectors.etymology.paragraph);
    const paragraphs = $paragraphs.toArray().map((paragraph) => clean($(paragraph).text()));
    const $lists = $elements.filter((_, element) => element.name === selectors.etymology.lists.unordered || element.name === selectors.etymology.lists.ordered);
    const listEntries = $lists
        .children(selectors.etymology.lists.elements)
        .toArray()
        .map((field) => clean($(field).text()));
    if (paragraphs.length === 0 && listEntries.length === 0) {
        return undefined;
    }
    return { paragraphs, listEntries };
}
