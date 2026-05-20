(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReadingTime = factory());
})(this, (function () { 'use strict';

    const imageReadTime = (numberImages, photosPerMinute) => {
        const seconds = numberImages > 10
            ? (numberImages / 2) * (photosPerMinute + 3) + (numberImages - 10) * 3
            : (numberImages / 2) * (2 * photosPerMinute + (1 - numberImages));
        return Math.ceil(seconds / 60);
    };
    const getImages = (str, { img, noscript }) => {
        const stripped = str.replace(noscript, "");
        const images = [];
        let image;
        while ((image = img.exec(stripped)) !== null) {
            images.push(image[1]);
        }
        return images.length;
    };
    const match = (str, { global, notAword, newLine, space }) => {
        const charCount = str.match(global);
        const text = str
            .replace(notAword, " ")
            .replace(newLine, " ")
            .replace(global, " ");
        return text.split(space).length + (charCount ? charCount.length : 0);
    };
    const excludeCount = (element, exc, regexDefault) => {
        let excludeCountChars = 0;
        Array.prototype.forEach.call(exc, (ex) => {
            if (ex && element.contains(ex)) {
                const text = ex.innerText.trim();
                excludeCountChars = match(text, regexDefault);
            }
        });
        return excludeCountChars;
    };

    const toSelector = (value) => Array.isArray(value) ? value.join(",") : value;
    class ReadingTime {
        constructor({ wordsPerMinute, photosPerMinute, elements, exclude, onResult = () => { }, }) {
            this.onResult = onResult;
            const $elements = document.querySelectorAll(toSelector(elements));
            const $exclude = exclude
                ? document.querySelectorAll(toSelector(exclude))
                : [];
            const $wordsPerMinute = wordsPerMinute || 200;
            const $regexDefault = {
                global: /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF]|[\u3131-\uD79D]/g,
                notAword: /\W+/g,
                noscript: /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/g,
                newLine: /[\r\n]/g,
                space: /\s+/g,
                img: /<img([\w\W]+?)[/]?>/g,
            };
            this.initial($elements, $exclude, $regexDefault, $wordsPerMinute, photosPerMinute);
        }
        initial(elements, exclude, regexDefault, wordsPerMinute, photosPerMinute) {
            elements.forEach((element, index) => {
                const excludeCountChars = excludeCount(element, exclude, regexDefault);
                const numberImages = getImages(element.innerHTML, regexDefault);
                const numberWords = match(element.innerText.trim(), regexDefault) -
                    excludeCountChars;
                const minuteWords = numberWords / wordsPerMinute;
                const imageTime = photosPerMinute
                    ? imageReadTime(numberImages, photosPerMinute)
                    : 0;
                const timeRead = photosPerMinute ? minuteWords + imageTime : minuteWords;
                this.onResult(index, timeRead, numberWords, numberImages);
            });
        }
    }

    return ReadingTime;

}));
//# sourceMappingURL=readingTime.umd.js.map
