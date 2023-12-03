//const axios = require("axios");
//const translate = require("translate-google");
//const franc = require("franc");
//const iso = require('iso-639-3')
import axios from 'axios'
import translate from 'translate-google'
import {franc, francAll} from 'franc'
import * as iso from 'iso-639-3'


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
    const translatedResponse = await translateText(apiResponse, iso.iso6393To1[`${detectedLangCode}`]);

    return translatedResponse 
  } catch (err) {
    throw new Error(err);
  }
}
const modules = {setConfig,version ,createText}
export {
  setConfig,
  createText,
  version
};
