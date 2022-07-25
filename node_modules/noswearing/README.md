# NoSwearingPlease
An advanced profanity filter based on English phonetics (how stuff sounds). For example, fck will get caught as fuck, but frck will not. Shat or shet will be caught as shit, but not shot.

* Tells you what swears and where they are used in a message
* Very resistant to filter bypassing attempts. Deviations to words will be caught and reported.
* Words with special characters can get caught (EG: ⓕ*ⓒⓚ)
* Words with certain deviations will get caught (EG: shat -> shit)

### Usage

```js
var checker = require("noswearing");
var result = checker("This Ⓕ*₵𝓴ing filter is the best shat I have ever seen");

/*
[ { original: 'Ⓕ*₵𝓴ing', // Original word in message
    word: 'fucking', // Word in dataset
    deviations: 2, // Number of deviations
    info: 2, // 0 = not very offensive, 1 = maybe, 2 = profane
    start: 5, // Start index of swear in original message
    end: 12 }, // End index of swear in original message
  { original: 'shat',
    word: 'shit',
    deviations: 1,
    info: 1,
    start: 32,
    end: 36 } ]
*/
```

### Disclaimer about Phonetics

Lots of things can go wrong with phonetics, especially for a filter as simple as this. Usually, phonetic filters are much more advanced, with things like NLP and machine learning. However, I didnt have the time or the desire to do that since I only made this filter to be a little better than all the FREE filters out there. In addition, I am just a programmer, not an English expert. When making this, I took a different approach, and leaned more towards experimentation. Due to that there might be some cases where this filter will just be plain wrong. But, if you find something like that, please tell me so I can fix it. I can't fix a problem I dont know of.

### Disclaimer about Data
Data is from Cuss - https://github.com/words/cuss

I didnt make it. I did modify some of it though, because the words there arn't very well-rated.

Here is their license:

```
(The MIT License)

Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
