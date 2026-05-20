import { RegexPatterns } from "./helpers/functions";
export interface ReadingTimeOptions {
    wordsPerMinute?: number;
    photosPerMinute?: number;
    elements: string | string[];
    exclude?: string | string[];
    onResult?: (index: number, timeRead: number, numberWords: number, numberImages: number) => void;
}
export default class ReadingTime {
    onResult: NonNullable<ReadingTimeOptions["onResult"]>;
    constructor({ wordsPerMinute, photosPerMinute, elements, exclude, onResult, }: ReadingTimeOptions);
    initial(elements: NodeListOf<Element>, exclude: ArrayLike<Element>, regexDefault: RegexPatterns, wordsPerMinute: number, photosPerMinute?: number): void;
}
//# sourceMappingURL=script.d.ts.map