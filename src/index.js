const axios = require('axios');
const translate = require('translate-google');
const langdetect = require('langdetect');

let args = {};
function setConfig(config) {
  args = config;
};
function version() {
  return require('./package.json').version;
}
async function createText(prompt) {
    try {
        // Translate the prompt to English
        const res = await translate(prompt, { to: 'en' });

        // Set up options for the API request
        const options = {
            method: 'GET',
            url: 'https://google-bard1.p.rapidapi.com/',
            headers: {
                userid: args.userid,
                message: res,
                key: args.key,
                'X-RapidAPI-Key': args.apikey,
                'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const detectedLang = langdetect.detectOne(prompt);
        const translatedResponse = await translate(response.data.response, { to: detectedLang });
        return translatedResponse;
    } catch (err) {
        throw new Error(err);
    }
}
module.exports = {
    setConfig,
    version,
    createText
}