const axios = require('axios');
const translate = require('translate-google');
const langdetect = require('langdetect');

let config = {};

function setConfig(newConfig) {
  config = { ...config, ...newConfig };
}

function getVersion() {
  return require('./package.json').version;
}

async function translateText(text, fromLang, toLang) {
  try {
    const translatedText = await translate(text, { from: fromLang, to: toLang });
    return translatedText;
  } catch (error) {
    throw new Error(`Translation error: ${error.message}`);
  }
}

async function requestApi(prompt) {
  try {
    const translatedPrompt = await translateText(prompt, 'auto', 'en');

    const options = {
      method: 'GET',
      url: 'https://google-bard1.p.rapidapi.com/',
      headers: {
        userid: config.userid,
        message: translatedPrompt,
        key: config.key,
        'X-RapidAPI-Key': config.apikey,
        'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const detectedLang = langdetect.detectOne(prompt);
    const translatedResponse = await translateText(response.data.response, 'en', detectedLang);

    return translatedResponse;
  } catch (error) {
    throw new Error(`API request error: ${error.message}`);
  }
}

async function createText(prompt) {
  try {
    const response = await requestApi(prompt);
    return response;
  } catch (error) {
    throw new Error(`Text creation error: ${error.message}`);
  }
}

module.exports = {
  setConfig,
  getVersion,
  createText,
  translateText, // Expose translateText for external use. (Optional)
  requestApi, // Expose requestApi for external use. (Optional)
};
