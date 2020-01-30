const fetch = require(`node-fetch`);

const currency = async () => {
    const API = `https://www.cbr-xml-daily.ru/daily_json.js`;
    const response = await fetch(API);
    const { Valute: { EUR: { Value: currency }}} = await response.json();
    return currency;
};

const changeCurrency = async (valueRub, lang) => {
    const format = (value) => value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const isDefault = (lang.toLowerCase() === `ru`);
    const rate = await currency();
    const valueEuro = Math.round((valueRub / rate) * 100) / 100;
    return (isDefault) ? format(String(valueRub)) : valueEuro.toFixed(2);
};

module.exports = { currency, changeCurrency };