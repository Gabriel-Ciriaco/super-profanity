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

function profanity(text, options) {
  options.autoLog = options.autoLog === undefined ? false : options.autoLog;
  options.mainLanguage =
    options.mainLanguage === undefined ? mainLanguage : options.mainLanguage;
  options.hideInformation =
    options.hideInformation === undefined ? false : true;

  text = text.toLowerCase();

  let result;

  detectAll(text).forEach((possibility) => {
    language = possibility.lang; // Return the language as iso2 format

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
          ? checker(text, options.mainLanguage)
          : result
      );
    } else {
      console.log(
        result === false || result === undefined
          ? checker(text, options.mainLanguage, options.hideInformation)
          : result
      );
    }
  } else {
    if (!options.hideInformation) {
      return result === false || result === undefined
        ? checker(text, options.mainLanguage)
        : result;
    } else {
      return result === false || result === undefined
        ? checker(text, options.mainLanguage, options.hideInformation)
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
  profanity,
  whitelistWord,
  blacklistWord,
  removeWord,
};
