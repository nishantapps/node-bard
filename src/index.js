const axios = require("axios");
const translate = require("translate-google");
const franc = require("franc");

let args = {};

function setConfig(config) {
  args = config;
}

function version() {
  return require("./package.json").version;
}

async function translateText(text, toLanguage) {
  try {
    return await translate(text, { to: toLanguage });
  } catch (error) {
    throw new Error(`[TRANSLATE] Translation failed: ${error.message}`);
  }
}

async function makeApiRequest(message) {
  try {
    const options = {
      method: "GET",
      url: "https://google-bard1.p.rapidapi.com/",
      headers: {
        userid: args.userid,
        message,
        key: args.key,
        "X-RapidAPI-Key": args.apikey,
        "X-RapidAPI-Host": "google-bard1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data.response;
  } catch (error) {
    throw new Error(`[API] Request failed: ${error.message}`);
  }
}

async function createText(prompt) {
  try {
    const detectedLangCode = franc(prompt);
    const detectedLang = translate.languages[detectedLangCode];
    const translatedPrompt = await translateText(prompt, "en");
    const apiResponse = await makeApiRequest(translatedPrompt);
    const translatedResponse = await translateText(apiResponse, detectedLang);

    return translatedResponse;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  setConfig,
  version,
  createText,
};
