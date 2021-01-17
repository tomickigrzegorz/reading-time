class ReadingTime {
  constructor({
    wordsPerMinute,
    elements,
    // regex,
    photosPerMinute,
    onResult = () => { },
  }) {
    this.onResult = onResult;
    this.elements = document.querySelectorAll(elements);
    // this.regex = regex;
    this.wordsPerMinute = wordsPerMinute || 200;
    this.photosPerMinute = photosPerMinute;

    this.regexDefault = {
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

    [this.elements].forEach((element) => {
      this.initial(element);
    });
  }

  initial = (elements) => {
    [...elements].forEach((element, index) => {
      const numberImages = this.getImages(element.innerHTML);
      const numberWords = this.match(element.innerText.trim());

      const minuteWords = numberWords / this.wordsPerMinute;
      const imageTime = this.imageReadTime(numberImages);

      const timeRead = this.photosPerMinute
        ? minuteWords + imageTime
        : minuteWords;

      this.onResult(index, timeRead, numberWords, numberImages);
    });
  };

  // https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/
  imageReadTime = (images) => {
    let second =
      images > 10
        ? (images / 2) * (this.photosPerMinute + 3) + (images - 10) * 3 // n/2(a+b)+3sec/image
        : (images / 2) * (2 * this.photosPerMinute + (1 - images)); // n/2[2a+(n-1)d]

    return Math.ceil(second / 60);
  };

  // get all images from elements
  getImages = (str) => {
    let images = [];
    let img;

    while (
      (img = this.regexDefault.img.exec(
        str.replace(this.regexDefault.noscript)
      ))
    ) {
      images.push(img[1]);
    }
    return images.length;
  };

  match = (str) => {
    // https://generator.lorem-ipsum.info/_korean2
    // https://www.regular-expressions.info/unicode.html

    const charCount = str.match(this.regexDefault.global);
    text = str.replace(this.regexDefault.notAword, ' ');
    text = str.replace(this.regexDefault.newLine, ' ');
    let text = str.replace(this.regexDefault.global, ' ');

    return (
      text.trim().split(this.regexDefault.space).length +
      (charCount ? charCount.length : 0)
    );
  };
}

export default ReadingTime;
