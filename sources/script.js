class ReadingTime {
  constructor({
    wordsPerMinute,
    elements,
    regex,
    template = () => { }
  }
  ) {
    this.template = template;
    this.elements = elements;
    this.regex = regex || /\s+/g;
    this.wordsPerMinute = wordsPerMinute || 200;
    this.words = 0;

    this.init();
  }

  init = () => {
    [...this.elements].forEach(el => {
      const elements = document.querySelectorAll(el);
      [...elements].forEach(element => {
        const regLocal = element.dataset.rtRegex;
        const regexLocal = regLocal !== undefined ? new RegExp(`${regLocal}|\s+`, "g") : this.regex;

        const numberWords = this.match(element.innerText.trim(), regexLocal);
        this.words += numberWords;
      });
    });

    this.minutes = Math.ceil(this.words / this.wordsPerMinute);

    this.template(this.minutes, this.words);
  };

  // regex for all elements
  match = (str, regexLocal) => {
    const matches = str.match(regexLocal);
    return matches ? matches.length : 0;
  }
}

export default ReadingTime;