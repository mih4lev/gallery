import { changeCurrency, changeMetric } from "../utils";

export const headerLanguage = () => {
    const downloadLocalization = async (lang) => {
        if (!lang) return false;
        const receive = await fetch(`/api/language/list/${lang}`);
        const data = await receive.json();
        for (const phrase in data) {
            const phraseNode = [...document.querySelectorAll(`.${phrase}`)];
            if (phraseNode.length) {
                phraseNode.forEach((node) => {
                    node.innerText = data[phrase];
                })
            }
        }
    };
    const createCustomEvent = (lang) => {
        const eventOptions = { detail: { lang }};
        const customEvent = new CustomEvent("languageChange", eventOptions);
        document.dispatchEvent(customEvent);
    };
    // boolean varible
    let isAlreadySelected = false;
    const block = document.querySelector(`.headerLanguage--list`);
    const link = document.querySelector(`.headerNav--language`);
    const links = document.querySelectorAll(`.headerLanguage--link`);
    const showList = (opacity, zIndex) => {
        return () => {
            if (isAlreadySelected) return false;
            block.style.opacity = opacity;
            block.style.zIndex = zIndex;
        };
    }; 
    const setHeaderLink = (value) => {
        const headerLink = document.querySelector(`.headerLanguage`);
        headerLink.innerText = value;
    };
    const setStorage = (value) => {
        const lang = value.substr(0, 2);
        const maxAge = 3600 * 24 * 30;
        document.cookie = `language=${lang}; path=/; max-age=${maxAge}`;
        localStorage.setItem(`options`, JSON.stringify({ language: value }));
    };
    const setLinkData = (link, language) => {
        const { 1: label } = language.split(`-`);
        link.dataset.language = language;
        link.innerText = label;
    };
    const setLinks = (language) => {
        const links = document.querySelectorAll(`.headerLanguage--link`);
        setLinkData(links[0], language);
        setLinkData(links[1], (language === `ru-RU`) ? `en-EN` : `ru-RU`);
    };
    const changeLanguage = (link) => {
        return async (event = { preventDefault: () => {}}) => {
            event.preventDefault();
            if (link.classList && link.classList.contains(`headerLanguage--active`)) return false;
            const { dataset: { language }} = link;
            const { 0: lang, 1: label } = language.split(`-`);
            setHeaderLink(label);
            setStorage(language);
            setLinks(language);
            const htmlNode = document.querySelector(`html`);
            htmlNode.setAttribute(`lang`, lang);
            showList(`0`, `-1`)();
            isAlreadySelected = true;
            await downloadLocalization(lang);
            await changeCurrency(lang);
            changeMetric(lang);
            createCustomEvent(lang);
            setTimeout(() => {
                isAlreadySelected = false;
            }, 1000);
        };
    };
    link.addEventListener(`mouseover`, showList(`1`, `101`));
    link.addEventListener(`mouseout`, showList(`0`, `-1`));
    [...links].forEach((link) => {
        link.addEventListener(`click`, changeLanguage(link));
    });
    // check localStorage for actual language version
    if (localStorage.getItem(`options`)) {
        const { language } = JSON.parse(localStorage.getItem(`options`));
        const { 0: lang } = language.split(`-`);
        const htmlNode = document.querySelector(`html`);
        if (htmlNode.lang === lang) return false;
        changeLanguage({ dataset: { language }})();
    }

};