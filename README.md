<div align="center">
	<h1>Super-Profanity
		<br/>
			<sub>A profanity filter that lives up to its name.</sub>
	</h1>
		<h4>An advanced profanity filter based on phonetics and normal detection that detects swears in 27 different languages!</h4>
</div>

---

* Tells you what and where swears were detected.
* A very resistant and effective filter against bypassing attempts.
* Detects words with special characters such as "@ssh0le".
* Custom options to help with your needs!

---

### Usage

```js
const { profanity } = require("super-profanity");
const result = profanity(
  "Stick your dentures in your @   ss and go f *c k i n g home laughing."
);
console.log(result);

/*
{
  badWordLanguage: 'en'
  detectedWord: '@  ss'
  isBadWord: true
  profanityWordRelated: 'ass'
}
*/
```

---

### Main Language

Although it tries its best, `super-profanity` is far from perfect... Thus, to guarantee that the code will check for swears in a desired language,
you have the option to select your main language, which by default is *English*. The main language will **always** be checked in the provided sentence.

Use `changeMainLanguage` if needed.

````js
const { changeMainLanguage } = require("super-profanity");

changeMainLanguage('pt');

/*
Changed main language from en to pt.
*/
````

---

### Useful functions

#### Whitelist
Whitelist a word in a specific language.
````js
const { whitelistWord } = require("super-profanity");

// It will whitelist in your mainLanguage by default.
whitelistWord("grass");

/*
grass whitelisted at en.
*/

````

````js
const { whitelistWord } = require("super-profanity");

// You can change the language in which the word will be added.
whitelistWord("merda", "pt").

/*
merda whitelisted at pt.
*/
````

#### Blacklist
Blacklist a word in a specific language.
````js
const { blacklistWord } = require("super-profanity");

// It will blacklist in your mainLanguage by default.
blacklistWord("🖕");

/*
🖕 blacklisted at en.
*/

````

````js
const { blacklistWord } = require("super-profanity");

// You can change the language in which the word will be added.
blacklistWord("🖕", "pt").

/*
🖕 blacklisted at pt.
*/
````

#### Remove Word
Remove a word in a specific language.
````js
const { removeWord } = require("super-profanity");

// It will remove from your mainLanguage by default.
removeWord("mierda");

/*
mierda removed from en.
*/

````

````js
const { removeWord } = require("super-profanity");

// You can change the language in which the word will be removed.
removeWord("shit", "es").

/*
shit removed from es.
*/
````

---

### Custom options
You can use some predefined options to help you through your development! Some of them are:

#### AutoLog
Automatically displays the detection information.
````js
const { profanity } = require("super-profanity");
profanity(
  "Stick your dentures in your @   ss and go f *c k i n g home laughing.",
  { autoLog: true }
);

/*
{
  badWordLanguage: 'en'
  detectedWord: '@  ss'
  isBadWord: true
  profanityWordRelated: 'ass'
}
*/
````

#### HideInformation
Displays or not the information about the detection.

```js
const { profanity } = require("super-profanity");
const result = profanity(
  "Stick your dentures in your @   ss and go f *c k i n g home laughing.",
  { hideInformation: true }
);

console.log(result);

/*
true
*/
```

---

### Disclaimer

This project was made with the use of two packages:

1. A modified version of [NoSwearingPlease](https://github.com/ThreeLetters/NoSwearingPlease "NoSwearingPlease")

Lincense:
```
MIT License

Copyright (c) 2019 Andrew S (Andrews54757@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
2. [TinyLD](https://github.com/komodojp/tinyld "TinyLD")

License: 
```
MIT License

Copyright (c) 2021 Komodo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author ✨

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/Gasegamer">
				<img src="https://avatars.githubusercontent.com/u/66225865" width="100px;" alt=""/>
				<br>
				<sub>
					<b>Gabriel C. de Carvalho</b>
				</sub>
		</td>
	</tr>
</table>
