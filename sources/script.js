class ReadingTime {
  constructor({ wordsTime, elements, regex, imagesTime, template = () => { } }) {
    this.template = template;
    this.elements = elements;
    this.regex = regex || /\s+/g;
    this.regexImg = /<img([\w\W]+?)[/]?>/g;
    this.wordsTime = wordsTime || 200;
    this.imagesTime = imagesTime;

    this.initial();
  }

  initial = () => {
    let wordsCount = 0;
    let imagesCount = 0;
    [...this.elements].forEach((el) => {
      const elements = document.querySelectorAll(el);
      [...elements].forEach((element) => {
        const regLocal = element.dataset.rtRegex;
        const regexGlobal =
          regLocal !== undefined
            ? new RegExp(`${regLocal}|\s+`, 'g')
            : this.regex;

        const numberImages = this.getImages(element.innerHTML);
        const numberWords = this.match(element.innerText.trim(), regexGlobal);

        wordsCount += numberWords;
        imagesCount += numberImages;
      });
    });

    const minuteWords = wordsCount / this.wordsTime;
    const imageTime = this.imageReadTime(imagesCount);
    const timeRead = this.imagesTime ? minuteWords + imageTime : minuteWords;

    this.template(timeRead, wordsCount, imagesCount);
  };

  // https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/
  imageReadTime = (images) => {
    let second =
      images > 10
        ? (images / 2) * (this.imagesTime + 3) + (images - 10) * 3 // n/2(a+b)+3sec/image
        : (images / 2) * (2 * this.imagesTime + (1 - images)); // n/2[2a+(n-1)d]

    return Math.ceil(second / 60);
  };

  // get all images from elements
  getImages = (str) => {
    const images = [];
    let img;

    while ((img = this.regexImg.exec(str))) {
      images.push(img[1]);
    }
    return images.length;
  };

  // regex for all elements
  match = (str, regexLocal) => {
    const matches = str.match(regexLocal);
    return matches ? matches.length + 1 : 0;
  };
}

export default ReadingTime;
