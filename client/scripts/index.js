(function(){
    const wrapper = document.querySelector(`.basket`);
    const link = document.querySelector(`.header_nav--basket`);
    const closeButton = document.querySelector(`.basket_close--button`);
    const showBasket = (zIndex, opacity, isDisabled) => {
        return (event) => {
            event.preventDefault();
            wrapper.style.zIndex = zIndex;
            wrapper.style.opacity = opacity;
            if (!isDisabled) return closeButton.removeAttribute(`disabled`);
            closeButton.setAttribute(`disabled`, `disabled`);
        };
    };
    link.addEventListener(`click`, showBasket(`100`, `1`, false));
    closeButton.addEventListener(`click`, showBasket(`-1`, `0`, true));
})();

(function(){
    let isAlreadySelected = false;
    const block = document.querySelector(`.language_list`);
    const link = document.querySelector(`.header_language--block`);
    const links = document.querySelectorAll(`.language_link`);
    const showList = (opacity, zIndex) => {
        return () => {
            if (isAlreadySelected) return false;
            block.style.opacity = opacity;
            block.style.zIndex = zIndex;
        };
    };
    const setHeaderLink = (value) => {
        const headerLink = document.querySelector(`.header_nav--language`);
        headerLink.innerText = value;
    };
    const setStorage = (value) => {
        localStorage.setItem(`options`, JSON.stringify({ language: value }));
    };
    const setLinkData = (link, language) => {
        const { 1: label } = language.split(`-`);
        link.dataset.language = language;
        link.innerText = label;
    };
    const setLinks = (language) => {
        const links = document.querySelectorAll(`.language_link`);
        setLinkData(links[0], language);
        setLinkData(links[1], (language === `ru-RU`) ? `en-EN` : `ru-RU`);
    };
    const changeLanguage = (link) => {
        return (event = { preventDefault: () => {}}) => {
            event.preventDefault();
            if (link.classList && link.classList.contains(`language_link--active`)) return false;
            const { dataset: { language }} = link;
            const { 0: lang, 1: label } = language.split(`-`);
            setHeaderLink(label);
            setStorage(language);
            setLinks(language);
            const htmlNode = document.querySelector(`html`);
            htmlNode.setAttribute(`lang`, lang);
            showList(`0`, `-1`)();
            isAlreadySelected = true;
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
        changeLanguage({ dataset: { language }})();
    }
})();