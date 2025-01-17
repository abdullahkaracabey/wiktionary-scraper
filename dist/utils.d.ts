type Reverse<O extends Record<string, string>> = {
    [K in keyof O as O[K]]: K;
};
export declare function reverseObject<O extends Record<string, string>>(object: O): Reverse<O>;
export declare function addMissingProperties<O extends Record<string, unknown>>(object: O, from: O): O;
export declare function clean(string: string): string;
export {};
