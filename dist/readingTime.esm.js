var imageReadTime = function imageReadTime(numberImages, photosPerMinute) {
  var second = numberImages > 10 ? numberImages / 2 * (photosPerMinute + 3) + (numberImages - 10) * 3
  : numberImages / 2 * (2 * photosPerMinute + (1 - numberImages));
  return Math.ceil(second / 60);
};
var getImages = function getImages(str, _ref) {
  var img = _ref.img,
      noscript = _ref.noscript;
  var images = [];
  var image;
  while (image = img.exec(str.replace(noscript))) {
    images.push(image[1]);
  }
  return images.length;
};
var match = function match(str, _ref2) {
  var global = _ref2.global,
      notAword = _ref2.notAword,
      newLine = _ref2.newLine,
      space = _ref2.space;
  var charCount = str.match(global);
  var text = str.replace(notAword, ' ');
  text = str.replace(newLine, ' ');
  text = str.replace(global, ' ');
  return text.split(space).length + (charCount ? charCount.length : 0);
};
var excludeCount = function excludeCount(element, exc, regexDefault) {
  var excludeCountChars = 0;
  [].slice.call(exc).forEach(function (ex) {
    var text = ex.innerText.trim();
    if (ex && element.contains(ex)) {
      excludeCountChars = match(text, regexDefault);
    }
  });
  return excludeCountChars;
};

var ReadingTime = function () {
  function ReadingTime(_ref) {
    var _this = this;
    var wordsPerMinute = _ref.wordsPerMinute,
        photosPerMinute = _ref.photosPerMinute,
        elements = _ref.elements,
        exclude = _ref.exclude,
        _ref$onResult = _ref.onResult,
        onResult = _ref$onResult === void 0 ? function () {} : _ref$onResult;
    this.onResult = onResult;
    var $elements = document.querySelectorAll(elements);
    var $exclude = document.querySelectorAll(exclude);
    var $wordsPerMinute = wordsPerMinute || 200;
    var $photosPerMinute = photosPerMinute;
    var $regexDefault = {
      global: /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]|[\u3131-\uD79D]/g,
      notAword: /\W+/g,
      noscript: /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/g,
      newLine: /[\r\n]/g,
      space: /\s+/g,
      img: /<img([\w\W]+?)[/]?>/g
    };
    [].slice.call([$elements]).forEach(function (element) {
      _this.initial(element, $exclude, $regexDefault, $wordsPerMinute, $photosPerMinute);
    });
  }
  var _proto = ReadingTime.prototype;
  _proto.initial = function initial(elements, exclude, regexDefault, wordsPerMinute, photosPerMinute) {
    var _this2 = this;
    [].slice.call(elements).forEach(function (element, index) {
      var excludeCountChars = excludeCount(element, exclude, regexDefault);
      var numberImages = getImages(element.innerHTML, regexDefault);
      var numberWords = match(element.innerText.trim(), regexDefault) - (excludeCountChars || 0);
      var minuteWords = numberWords / wordsPerMinute;
      var imageTime = imageReadTime(numberImages, photosPerMinute);
      var timeRead = photosPerMinute ? minuteWords + imageTime : minuteWords;
      _this2.onResult(index, timeRead, numberWords, numberImages);
    });
  };
  return ReadingTime;
}();

export { ReadingTime as default };
//# sourceMappingURL=readingTime.esm.js.map
