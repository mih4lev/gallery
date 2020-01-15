export const similarPhoto = () => {

    const links = document.querySelectorAll(`.similarLink`);
    const targetPhoto = (isLinkHovered) => {
        return ({ target: link }) => {
            const method = (isLinkHovered) ? `add` : `remove`;
            const photo = link.closest(`.similarParent`).querySelector(`.similarPhoto`);
            photo.classList[method](`similarPhoto--active`);
        };
    };
    const addListeners = (link) => {
        link.addEventListener(`mouseover`, targetPhoto(true));
        link.addEventListener(`mouseout`, targetPhoto(false));
    };
    [...links].forEach(addListeners);

};

export const currency = async () => {
    const API = `https://www.cbr-xml-daily.ru/daily_json.js`;
    const response = await fetch(API);
    const { Valute: { EUR: { Value: currency }}} = await response.json();
    return currency;
};

export const changeCurrency = async (lang) => {
    const format = (value) => value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const isDefault = (lang === `ru`);
    const rate = await currency();
    const currencyNodes = [...document.querySelectorAll(`[data-rub]`)];
    currencyNodes.forEach((node) => {
        const { dataset: { rub: valueRub }} = node;
        const valueEuro = Math.round((valueRub / rate) * 100) / 100;
        const value = (isDefault) ? format(valueRub) : valueEuro.toFixed(2);
        const selector = (isDefault) ? [ `euro`, `rub` ] : [ `rub`, `euro` ];
        node.classList.replace(`price--${selector[0]}`, `price--${selector[1]}`);
        node.innerText = value;
    });
};