const bard = require('./index');

const config = {
    userid:'RK2NpysYNOWK2U2HtFlC',
    key:'AIzaSyDTFn6X_PSdpDwm8szBlbIAtUuPrg21dZo',
    apikey:'3482f1a70emshd44e76978f99178p19e72djsn68a544565b42'
};

bard.setConfig(config);

async function main() {
    console.log(await bard.createText('नमस्ते, मैं निशांत शर्मा हूं'))
}

main();