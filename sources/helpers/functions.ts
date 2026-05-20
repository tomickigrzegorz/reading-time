// https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/

export interface RegexPatterns {
  global: RegExp;
  notAword: RegExp;
  noscript: RegExp;
  newLine: RegExp;
  space: RegExp;
  img: RegExp;
}

export const imageReadTime = (
  numberImages: number,
  photosPerMinute: number
): number => {
  const seconds =
    numberImages > 10
      ? (numberImages / 2) * (photosPerMinute + 3) + (numberImages - 10) * 3
      : (numberImages / 2) * (2 * photosPerMinute + (1 - numberImages));

  return Math.ceil(seconds / 60);
};

export const getImages = (
  str: string,
  { img, noscript }: Pick<RegexPatterns, "img" | "noscript">
): number => {
  const stripped = str.replace(noscript, "");
  const images: string[] = [];
  let image: RegExpExecArray | null;

  while ((image = img.exec(stripped)) !== null) {
    images.push(image[1]);
  }

  return images.length;
};

// https://generator.lorem-ipsum.info/_korean2
// https://www.regular-expressions.info/unicode.html
export const match = (
  str: string,
  { global, notAword, newLine, space }: Omit<RegexPatterns, "noscript" | "img">
): number => {
  const charCount = str.match(global);

  const text = str
    .replace(notAword, " ")
    .replace(newLine, " ")
    .replace(global, " ");

  return text.split(space).length + (charCount ? charCount.length : 0);
};

export const excludeCount = (
  element: Element,
  exc: ArrayLike<Element>,
  regexDefault: RegexPatterns
): number => {
  let excludeCountChars = 0;
  Array.prototype.forEach.call(exc, (ex: Element) => {
    if (ex && element.contains(ex)) {
      const text = (ex as HTMLElement).innerText.trim();
      excludeCountChars = match(text, regexDefault);
    }
  });

  return excludeCountChars;
};
