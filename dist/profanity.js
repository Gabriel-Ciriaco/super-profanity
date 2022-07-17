/*
 * License
 *
 * This work is dual-licensed under Mozilla 2.0 and Apache 2.0.
 * You can't choose between one of them if you use this work.
 * `SPDX-License-Identifier: Apache-2.0 OR GPL-2.0-or-later`
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *   Copyright 2022 Gabriel Carvalho
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require("fs").promises;
const path = require("path");

const { detectAll } = require("tinyld");
const { NoSwearing } = require(path.resolve(
  __dirname,
  "./custom_module/noswearing"
));

/** @let {string} - Default language used to detect bad words. */
let mainLanguage = "en";

const profanityJson = JSON.parse(
  require("fs").readFileSync(
    path.resolve(__dirname, "./profanity_words.json"),
    "utf8"
  )
);

/**
 * Detect bad word based on the detected language
 * @param {string} text - Sentence to detect a bad word.
 * @param {string} [language=mainLanguage] - Language, in ISO2 format, used to detect a bad word.
 * @param {boolean} [hideInformation=false] - Show information about the detection.
 *
 * @type {boolean=} isBadWord - Returns true if it detects a bad word on the sentence, and false otherwise.
 * @type {string=} detectedWord - Shows the word detected as a bad word.
 * @type {string=} profanityWordRelated - The word which appears to be the bad word.
 * @type {string=} badWordLanguage - The language where the bad word was detected.
 */
function checker(text, language = mainLanguage, hideInformation = false) {
  const noSwear = new NoSwearing(profanityJson[language]);
  const result = noSwear.check(text)[0];

  if (result !== undefined && !hideInformation) {
    return {
      isBadWord: true,
      detectedWord: result.original,
      profanityWordRelated: result.word,
      badWordLanguage: language,
    };
  } else if (result !== undefined && hideInformation) {
    return true;
  }

  return false;
}

/**
 * Detect a bad word contained in a text.
 *
 * @param {string} text - The text where is wanted to find a bad word.
 * @param {Object=} options - Optional functions to help with your needs.
 * @param {boolean=} [options.autoLog=false] - Automatically displays the detection information.
 * @param {hideInformation=} [options.hideInformation=false] - Displays or not the information about the detection.
 */
function profanity(text, options = {}) {
  options.autoLog = options.autoLog === undefined ? false : options.autoLog;
  options.hideInformation =
    options.hideInformation === undefined ? false : true;

  text = text.toLowerCase();

  let result;

  detectAll(text).forEach((possibility) => {
    language = possibility.lang; // Return the language as iso2 format

    if (result !== undefined && result !== false) return; // Prevents result from being rewritten.

    if (profanityJson[language] && !options.hideInformation) {
      // Check if there is a profanity word list for this language
      result = checker(text, language); // Check if there is a bad word by spelling
    } else {
      result = checker(text, language, options.hideInformation);
    }
  });

  if (options.autoLog) {
    if (!options.hideInformation) {
      // Guarantee it's not a bad word based on the main language defined
      console.log(
        result === false || result === undefined
          ? checker(text)
          : result
      );
    } else {
      console.log(
        result === false || result === undefined
          ? checker(text, null, options.hideInformation)
          : result
      );
    }
  } else {
    if (!options.hideInformation) {
      return result === false || result === undefined
        ? checker(text)
        : result;
    } else {
      return result === false || result === undefined
        ? checker(text, null, options.hideInformation)
        : result;
    }
  }
}

async function updateProfanityJson(logMessage) {
  fs.writeFile(
    path.resolve(__dirname, "./profanity_words.json"),
    JSON.stringify(profanityJson, null, 2)
  )
    .then(() => {
      console.log(logMessage);
    })
    .catch((er) => {
      console.error(er);
    });
}

/**
 * Whitelist a word in a specific language.
 *
 * @param {string} word - Word wished to whitelist.
 * @param {string} language - Language, in ISO2 format, where the word will be whitelisted.
 */
function whitelistWord(word, language = mainLanguage) {
  let languageProfanityWords = profanityJson[language];
  languageProfanityWords[word] = 0;

  return updateProfanityJson(`${word} whitelisted at ${language}.`);
}

/**
 * Blacklist a word in a specific language.
 *
 * @param {string} word - Word wished to blacklist.
 * @param {string} language - Language, in ISO2 format, where the word will be blacklisted.
 */
function blacklistWord(word, language = mainLanguage) {
  let languageProfanityWords = profanityJson[language];
  languageProfanityWords[word] = 2;

  return updateProfanityJson(`${word} blacklisted at ${language}.`);
}

/**
 * Remove a word in a specific language.
 *
 * @param {string} word - Word wished to remove.
 * @param {string} language - Language, in ISO2 format, where the word will be removed.
 */
function removeWord(word, language = mainLanguage) {
  let languageProfanityWords = profanityJson[language];

  if (languageProfanityWords[word] !== undefined) {
    delete languageProfanityWords[word];
    return updateProfanityJson(`${word} removed from ${language}.`);
  } else {
    return `${word} not found.`;
  }
}

/**
 * Change main language.
 * @param {string} newLang - Language, in ISO2 format, desired to be the new main language.
 */
function changeMainLanguage(newLang){
  let originalMain = mainLanguage;
  mainLanguage = newLang;

  return console.log(`Changed main language from ${originalMain} to ${newLang}.`);
}

module.exports = {
  profanity,
  changeMainLanguage,
  whitelistWord,
  blacklistWord,
  removeWord,
};
