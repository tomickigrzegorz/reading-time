export interface RegexPatterns {
    global: RegExp;
    notAword: RegExp;
    noscript: RegExp;
    newLine: RegExp;
    space: RegExp;
    img: RegExp;
}
export declare const imageReadTime: (numberImages: number, photosPerMinute: number) => number;
export declare const getImages: (str: string, { img, noscript }: Pick<RegexPatterns, "img" | "noscript">) => number;
export declare const match: (str: string, { global, notAword, newLine, space }: Omit<RegexPatterns, "noscript" | "img">) => number;
export declare const excludeCount: (element: Element, exc: ArrayLike<Element>, regexDefault: RegexPatterns) => number;
//# sourceMappingURL=functions.d.ts.map