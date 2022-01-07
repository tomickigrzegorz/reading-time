// https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/
/**
 * Calculate how much time is needed to view photos
 * @param {Number} numberImages
 * @param {Number} photosPerMinute
 * @returns {Number}
 */
const imageReadTime = (numberImages, photosPerMinute) => {
  let second =
    numberImages > 10
      ? (numberImages / 2) * (photosPerMinute + 3) + (numberImages - 10) * 3 // n/2(a+b)+3sec/image
      : (numberImages / 2) * (2 * photosPerMinute + (1 - numberImages)); // n/2[2a+(n-1)d]

  return Math.ceil(second / 60);
};

/**
 * Get all images from elements
 * @param {String} str
 * @param {Object} { img, noscript }
 * @returns {Number}
 */
const getImages = (str, { img, noscript }) => {
  let images = [];
  let image;

  while ((image = img.exec(str.replace(noscript)))) {
    images.push(image[1]);
  }

  return images.length;
};

// https://generator.lorem-ipsum.info/_korean2
// https://www.regular-expressions.info/unicode.html
/**
 * Count all characters in string
 * @param {String} str
 * @param {Object} { global, notAword, newLine, space }
 * @returns {Number}
 */
const match = (str, { global, notAword, newLine, space }) => {
  const charCount = str.match(global);

  let text = str.replace(notAword, " ");
  text = str.replace(newLine, " ");
  text = str.replace(global, " ");

  return text.split(space).length + (charCount ? charCount.length : 0);
};

/**
 * Count how many characters are excluded from counting
 * @param {HTMLElement} element
 * @param {Array} exc - exclude elements
 * @returns {Number} exclude count chars
 */
const excludeCount = (element, exc, regexDefault) => {
  let excludeCountChars = 0;
  [].slice.call(exc).forEach((ex) => {
    const text = ex.innerText.trim();
    if (ex && element.contains(ex)) {
      excludeCountChars = match(text, regexDefault);
    }
  });

  return excludeCountChars;
};

export { imageReadTime, getImages, match, excludeCount };
