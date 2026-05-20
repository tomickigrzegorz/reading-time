import {
  imageReadTime,
  getImages,
  match,
  excludeCount,
  RegexPatterns,
} from "./helpers/functions";

export interface ReadingTimeOptions {
  wordsPerMinute?: number;
  photosPerMinute?: number;
  elements: string | string[];
  exclude?: string | string[];
  onResult?: (
    index: number,
    timeRead: number,
    numberWords: number,
    numberImages: number
  ) => void;
}

const toSelector = (value: string | string[]): string =>
  Array.isArray(value) ? value.join(",") : value;

export default class ReadingTime {
  onResult: NonNullable<ReadingTimeOptions["onResult"]>;

  constructor({
    wordsPerMinute,
    photosPerMinute,
    elements,
    exclude,
    onResult = () => {},
  }: ReadingTimeOptions) {
    this.onResult = onResult;

    const $elements = document.querySelectorAll(toSelector(elements));
    const $exclude: ArrayLike<Element> = exclude
      ? document.querySelectorAll(toSelector(exclude))
      : [];

    const $wordsPerMinute = wordsPerMinute || 200;

    const $regexDefault: RegexPatterns = {
      // hiragana | katakana | singleCJK | korean
      global:
        /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]|[\u3131-\uD79D]/g,
      notAword: /\W+/g,
      noscript: /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/g,
      newLine: /[\r\n]/g,
      space: /\s+/g,
      img: /<img([\w\W]+?)[/]?>/g,
    };

    this.initial(
      $elements,
      $exclude,
      $regexDefault,
      $wordsPerMinute,
      photosPerMinute
    );
  }

  initial(
    elements: NodeListOf<Element>,
    exclude: ArrayLike<Element>,
    regexDefault: RegexPatterns,
    wordsPerMinute: number,
    photosPerMinute?: number
  ): void {
    elements.forEach((element, index) => {
      const excludeCountChars = excludeCount(element, exclude, regexDefault);
      const numberImages = getImages(element.innerHTML, regexDefault);
      const numberWords =
        match((element as HTMLElement).innerText.trim(), regexDefault) -
        excludeCountChars;

      const minuteWords = numberWords / wordsPerMinute;
      const imageTime = photosPerMinute
        ? imageReadTime(numberImages, photosPerMinute)
        : 0;

      const timeRead = photosPerMinute ? minuteWords + imageTime : minuteWords;

      this.onResult(index, timeRead, numberWords, numberImages);
    });
  }
}
