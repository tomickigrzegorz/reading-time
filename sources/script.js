import {
  imageReadTime,
  getImages,
  match,
  excludeCount,
} from "./helpers/functions";

/**
 * @class
 */
export default class ReadingTime {
  /**
   * ReadingTime Construktor
   * @param {Number} $wordsPerMinute
   * @param {Number} $photosPerMinute
   * @param {Array} $elements
   * @param {Array} $exclude
   * @param {Function} onResult - callback function
   */
  constructor({
    wordsPerMinute,
    photosPerMinute,
    elements,
    exclude,
    onResult = () => {},
  }) {
    this.onResult = onResult;

    const $elements = document.querySelectorAll(elements);
    const $exclude = document.querySelectorAll(exclude);
    const $wordsPerMinute = wordsPerMinute || 200;
    const $photosPerMinute = photosPerMinute;

    const $regexDefault = {
      // hiragana | katakana | singleCJK | korean
      global: /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]|[\u3131-\uD79D]/g,
      // is not a word
      notAword: /\W+/g,
      // noscript
      noscript: /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/g,
      // newline
      newLine: /[\r\n]/g,
      // space
      space: /\s+/g,
      // image
      img: /<img([\w\W]+?)[/]?>/g,
    };

    [].slice.call([$elements]).forEach((element) => {
      this.initial(
        element,
        $exclude,
        $regexDefault,
        $wordsPerMinute,
        $photosPerMinute
      );
    });
  }

  /**
   * Initial
   * @param {HTMLElement} elements
   * @param {HTMLElement} exclude
   * @param {Object} regexDefault
   * @param {Number} wordsPerMinute
   * @param {Number} photosPerMinute
   */
  initial(elements, exclude, regexDefault, wordsPerMinute, photosPerMinute) {
    [].slice.call(elements).forEach((element, index) => {
      // exclude count chars
      const excludeCountChars = excludeCount(element, exclude, regexDefault);

      // get all image from text
      const numberImages = getImages(element.innerHTML, regexDefault);

      // trim text
      const numberWords =
        match(element.innerText.trim(), regexDefault) -
        (excludeCountChars || 0);

      const minuteWords = numberWords / wordsPerMinute;
      const imageTime = imageReadTime(numberImages, photosPerMinute);

      const timeRead = photosPerMinute ? minuteWords + imageTime : minuteWords;

      this.onResult(index, timeRead, numberWords, numberImages);
    });
  }
}
