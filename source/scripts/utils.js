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
    const response = await fetch(`/api/currency`);
    return await response.json();
};

export const changeCurrency = async (lang) => {
    const format = (value) => value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const isDefault = (lang === `ru`);
    const rate = await currency();
    const currencyNodes = [...document.querySelectorAll(`.price`)];
    currencyNodes.forEach((node) => {
        const { dataset: { rub: valueRub }} = node;
        const valueEuro = Math.round((valueRub / rate) * 100) / 100;
        const value = (isDefault) ? format(valueRub) : valueEuro.toFixed(2);
        const SL = (isDefault) ? [ `euro`, `rub` ] : [ `rub`, `euro` ];
        node.classList.remove(`price--${SL[0]}`);
        node.classList.add(`price--${SL[1]}`);
        node.innerText = value;
    });
};

export const changeMetric = (lang) => {
    const metricLabels = [...document.querySelectorAll(`.metric`)];
    const isDefault = (lang === `ru`);
    metricLabels.forEach((label) => {
        const SL = (isDefault) ? [ `en`, `ru` ] : [ `ru`, `en` ];
        label.classList.remove(`metric--${SL[0]}`);
        label.classList.add(`metric--${SL[1]}`);
    });
};