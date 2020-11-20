class ReadingTime {
  constructor({
    wordsPerMinute,
    elements,
    regex,
    template = () => { }
  }) {
    this.template = template;
    this.elements = elements;
    this.regex = regex || /\s+/g;
    this.wordsPerMinute = wordsPerMinute || 200;

    this.initial();
  }

  initial = () => {
    let words = 0;
    [...this.elements].forEach(el => {
      const elements = document.querySelectorAll(el);
      [...elements].forEach(element => {
        const regLocal = element.dataset.rtRegex;
        const regexLocal = regLocal !== undefined ? new RegExp(`${regLocal}|\s+`, "g") : this.regex;

        const numberWords = this.match(element.innerText.trim(), regexLocal);
        words += numberWords;
      });
    });

    const minutes = Math.ceil(words / this.wordsPerMinute);

    this.template(minutes, words);
  };

  // regex for all elements
  match = (str, regexLocal) => {
    const matches = str.match(regexLocal);
    return matches ? matches.length + 1 : 0;
  }
}

export default ReadingTime;