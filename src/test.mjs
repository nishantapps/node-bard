import {setConfig,createText} from './index.mjs'
const config = {
    userid:'RK2NpysYNOWK2U2HtFlC',
    key:'AIzaSyDTFn6X_PSdpDwm8szBlbIAtUuPrg21dZo',
    apikey:'3482f1a70emshd44e76978f99178p19e72djsn68a544565b42'
};

setConfig(config);


async function main() {
    console.log(await createText('Привет братан'))
}

main();