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
Download file `readingTime.min.js` from `docs` and add before close `</body>` `<script src="./readingTime.min.js"></script>`

Add HTML element with information about the number of minutes and words
```html
<h1 id="reading-time"></h1>
```

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