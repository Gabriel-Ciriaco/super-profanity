const fs = require("fs").promises;
const path = require("path");

const { detectAll } = require("tinyld");
const { NoSwearing } = require("noswearing");

const mainLanguage = "en";

const profanityJson = JSON.parse(
  require("fs").readFileSync(
    path.resolve(__dirname, "./profanity_words.json"),
    "utf8"
  )
);

function checker(text, language = mainLanguage) {
  const noSwear = new NoSwearing(profanityJson[language]);
  const result = noSwear.check(text)[0];

  if (result !== undefined) {
    return {
      isBadWord: true,
      detectedWord: result.original,
      profanityWordRelated: result.word,
      badWordLanguage: language,
    };
  }

  return false;
}

function profanity(text, autoLog = false) {
  text = text.toLowerCase();
  let result;

  detectAll(text).forEach((possibility) => {
    language = possibility.lang; // Return the language as iso2 format

    if (profanityJson[language]) {
      // Check if there is a profanity word list for this language
      result = checker(text, language); // Check if there is a bad word by spelling
    }
  });

  if (autoLog) {
    // Guarantee it's not a bad word based on the main language defined
    console.log(
      result === false || result === undefined
        ? checker(text, mainLanguage)
        : result
    );
  } else {
    return result === false || result === undefined
      ? checker(text, mainLanguage)
      : result;
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

function whitelistWord(word, language = mainLanguage) {
  let languageProfanityWords = profanityJson[language];
  languageProfanityWords[word] = 0;

  return updateProfanityJson(`${word} whitelisted at ${language}`);
}

function blacklistWord(word, language = mainLanguage) {
  let languageProfanityWords = profanityJson[language];
  languageProfanityWords[word] = 2;

  return updateProfanityJson(`${word} blacklisted at ${language}.`);
}

function removeWord(word, language = mainLanguage) {
  let languageProfanityWords = profanityJson[language];

  if (languageProfanityWords[word] !== undefined) {
    delete languageProfanityWords[word];
    return updateProfanityJson(`${word} removed from ${language}.`);
  } else {
    return `${word} not found.`;
  }
}

module.exports = {
  mainLanguage,
  profanity,
  whitelistWord,
  blacklistWord,
  removeWord,
};
