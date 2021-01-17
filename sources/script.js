class ReadingTime {
  constructor({
    wordsTime,
    elements,
    regex,
    imagesTime,
    remote,
    template = () => { },
  }) {
    this.template = template;
    this.elements = document.querySelectorAll(elements);
    this.regex = regex || /\s+/g;
    this.remote = remote;
    this.regexImg = /<img([\w\W]+?)[/]?>/g;
    this.wordsTime = wordsTime || 200;
    this.imagesTime = imagesTime;

    [this.elements].forEach((element) => {
      console.log(element);
      this.initial(element);
    });
  }

  initial = (elements) => {
    [...elements].forEach((element, index) => {
      const regLocal = element.dataset.rtRegex;
      const dataFile = element.dataset.file;

      const readWordsFromFile = dataFile
        ? this.readFile(dataFile, this.remote)
        : '';

      console.log(readWordsFromFile);

      const regexGlobal =
        regLocal !== undefined
          ? new RegExp(`${regLocal}|\s+`, 'g')
          : this.regex;

      const numberImages = this.getImages(element.innerHTML);
      const numberWords = this.match(element.innerText.trim(), regexGlobal);

      const minuteWords = numberWords / this.wordsTime;
      const imageTime = this.imageReadTime(numberImages);
      const timeRead = this.imagesTime ? minuteWords + imageTime : minuteWords;

      this.template(
        index,
        timeRead,
        numberWords,
        numberImages,
        readWordsFromFile
      );
    });
  };

  readFile = async (file, remote) => {
    const response = await fetch(file);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const text = doc.querySelector(remote.place);
    return text;
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
