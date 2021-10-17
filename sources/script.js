class ReadingTime {
  constructor({
    wordsPerMinute,
    elements,
    exclude,
    photosPerMinute,
    onResult = () => {},
  }) {
    this.onResult = onResult;
    this.elements = document.querySelectorAll(elements);

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

    const exc = document.querySelectorAll(exclude);
    [].slice.call([this.elements]).forEach((element) => {
      this.initial(element, exc);
    });
  }

  exCount = (element, exc) => {
    let excludeCountChars = 0;
    [].slice.call(exc).forEach((ex) => {
      const text = ex.innerText.trim();
      if (ex && element.contains(ex)) {
        excludeCountChars = this.match(text);
      }
    });

    return excludeCountChars;
  };

  initial = (elements, exc) => {
    [].slice.call(elements).forEach((element, index) => {
      // exclude count chars
      const excludeCountChars = this.exCount(element, exc);

      // get all image from text
      const numberImages = this.getImages(element.innerHTML);

      // trim text
      const numberWords =
        this.match(element.innerText.trim()) - (excludeCountChars || 0);

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
    const photo = this.photosPerMinute;
    let second =
      images > 10
        ? (images / 2) * (photo + 3) + (images - 10) * 3 // n/2(a+b)+3sec/image
        : (images / 2) * (2 * photo + (1 - images)); // n/2[2a+(n-1)d]

    return Math.ceil(second / 60);
  };

  // get all images from elements
  getImages = (str) => {
    const { img, noscript } = this.regexDefault;
    let images = [];
    let image;

    while ((image = img.exec(str.replace(noscript)))) {
      images.push(image[1]);
    }

    return images.length;
  };

  // https://generator.lorem-ipsum.info/_korean2
  // https://www.regular-expressions.info/unicode.html
  match = (str) => {
    const { global, notAword, newLine, space } = this.regexDefault;

    const charCount = str.match(global);

    let text = str.replace(notAword, ' ');
    text = str.replace(newLine, ' ');
    text = str.replace(global, ' ');

    return text.split(space).length + (charCount ? charCount.length : 0);
  };
}

export default ReadingTime;
