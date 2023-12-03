import {setConfig,createText} from './index.mjs'
const config = {
    userid:'userid',
    key:'makersuite.google.com key',
    apikey:'rapidapi key'
};

setConfig(config);


async function main() {
    console.log(await createText('Привет братан'))
}

main();
