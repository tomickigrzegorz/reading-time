<h1 align="center">reading-time</h1>

<p align="center">
  A simple, lightweight plugin used to display an estimated time to read some text and images, no dependency
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/tomik23/reading-time?style=for-the-badge">
  <img src="https://img.shields.io/github/size/tomik23/reading-time/docs/readingTime.min.js?style=for-the-badge">
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/tomik23/reading-time?style=for-the-badge">
  </a>
</p>

## Demo

See the demo - [example](https://tomik23.github.io/reading-time/)  
An example of production use can be seen [here](https://grzegorztomicki.pl/rzym-w-majowy-weekend.html).

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

Download file `readingTime.min.js` from `docs` and add before close `</body>`, `<script src="./path/to/readingTime.min.js"></script>`

Add an HTML element to which we will inject information about the minutes and the number of words as well as photos.

```html
<section>
  <h2 class="reading-time"></h2>
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quibusdam qui
  tempore aspernatur repudiandae commodi consequatur nam quisquam voluptates.
  Porro laudantium fugit natus ducimus
  <img src="https://grzegorztomicki.pl/images/lwow/576/IMG_0202.jpg" />
</section>
```

Call our library and add configuration.

JavaScript

```js
<script>
  new ReadingTime({
    // set the speed of read words per minute
    wordsPerMinute: 215,

    // set the photo viewing speed per second
    photosPerMinute: 12,

    // an array of elements from which
    // we count words and images,
    // it can be an html element, a class element,
    // or even the whole body
    elements: ['section', '.test'],

    // the ability to exclude parts of
    // the text from counting
    exclude: ['.exclude-element', 'ul'],

    // callback function with which we put the text
    // with the number of characters and minutes
    onResult: function (index, minutes, words, images) {
      const elements = document.querySelectorAll('.reading-time')[index];
      const img = images ? ', images: ' + images : '';

      elements.innerHTML = '~' + Math.ceil(minutes) + ' min read (words: ' + words + img + ')';
    }
  });
</script>
```

## Summary

As you can see in the example [reading-time](https://tomik23.github.io/reading-time/), the library has been tested with several languages such as Georgian, Arabic, Korean, Hindi, Japanise, Chinese ...
You can control the time at which the text `wordsPerMinute` is read and when we view photos `photosPerMinute`.

Unfortunately, at present you can only set the reading time globally, you cannot set the time for a particular language. On the other hand, there are practically no articles with many languages, therefore you can take the average of all languages.

Languages can be mixed, they don't have to be in the same section. You can count all the words on the page, you just need to set `elements: ['body']`
