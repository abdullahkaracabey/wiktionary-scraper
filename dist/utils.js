import patterns from "./constants/patterns.js";
export function reverseObject(object) {
    const reversed = {};
    for (const key of Object.keys(object)) {
        // @ts-ignore: This is okay.
        reversed[object[key]] = key;
    }
    return reversed;
}
export function addMissingProperties(object, from) {
    for (const key of Object.keys(from)) {
        if (!(key in object)) {
            object[key] = from[key];
        }
        else if (Array.isArray(object[key])) {
            for (const element of from[key]) {
                object[key].push(element);
            }
        }
        else if (typeof object[key] === "object") {
            addMissingProperties(object[key], from[key]);
        }
    }
    return object;
}
export function clean(string) {
    return string.trim().replaceAll(patterns.multipleWhitespace, " ");
}
