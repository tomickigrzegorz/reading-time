<h1 align="center">reading-time</h1>

<p align="center">
  A simple, lightweight plugin used to display an estimated time to read some text no dependency
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/tomik23/reading-time">
  <img src="https://img.shields.io/github/size/tomik23/reading-time/docs/readingTime.min.js">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
</p>

## Demo

See the demo - [example](https://tomik23.github.io/reading-time/)


## Initialization
```js
yarn
// or
npm install
```

## Run the app
Run the app, just call:

```js
yarn watch
// or
npm run watch
```

## The final code:
```js
yarn build
// or
npm run build
```

## Installation
Download file `readingTime.min.js` from `docs` and add before close `</body>`, `<script src="./readingTime.min.js"></script>`

Add an HTML element into which we will inject information about minutes and word count.
```html
<h1 id="reading-time"></h1>
```
Call our library and add configuration.

JavaScript
```js
<script>
  new ReadingTime({
    // set the speed of read words per minute
    wordsPerMinute: 215,

    // global regex for all elements, you can set
    // a specific regex for an element just add 
    // data-rt-regex from regex to the element
    // default /\s+/g
    regex: /\s+/g,

    // set the photo viewing speed per secund
    imagesTime: 12,

    // an array of elements from which we count words
    elements: ['.text-head', 'article'],

    // callback function with which
    // we put the text with the number of characters and minutes
    template: (minutes, words) => {
      const element = document.getElementById('reading-time');
      element.innerHTML = `${minutes} min (words: ${words})`;
    }
  });
</script>
```
props | type | require | default | description
----- | :---: | :-----: | :-----: | -----------
wordsPerMinute | number |   | 200 | set the speed of read words per minute
regex | string |    | /\s+/g | global regex for all elements, you can set a specific regex for an element just add `data-rt-regex` from regex to the element
imagesTime | number |   |   | set the photo viewing speed per secund
elements | array | ✔ |   | an array of elements from which we count words
template | function | ✔ |    | callback function with which we put the text with the number of characters and minutes

## Additional configuration
If you want to add additional configuration (regex) for a particular field, just add:

```HTML
<article data-rt-regex="[\u00ff-\uffff]">
  <h2>什么是Lorem Ipsum?</h2>
  Lorem Ipsum，也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野。
</article>
```