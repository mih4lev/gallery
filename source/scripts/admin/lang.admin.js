import {
    cloneTemplate, collectData, fillFields, hideLoader, hideTemplate, requestMainButton, showLoader
} from "./utils.admin";

const selectData = async (langSelector) => {
    const response = await fetch(`/api/language/selector/${langSelector}`);
    return await response.json();
};

const editHandler = (editWrapper, langSelector) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const body = collectData(editWrapper);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/language/${langSelector}`, options);
        const { code } = await response.json();
        if (code === 200) {
            const pageLang = document.querySelector(`html`).getAttribute(`lang`);
            const langNodes = [...document.querySelectorAll(`.${langSelector}`)];
            langNodes.forEach((node) => {
                node.innerText = (pageLang === `ru`) ? body.langRU : body.langEN;
            });
            return hideTemplate(editWrapper);
        }
        // add errors visible
    }
};

const showEditableWindow = async (event) => {
    event.preventDefault();
    const { target: { dataset: { langSelector }}} = event;
    const editWrapper = cloneTemplate(`.langTemplate`);
    const data = await selectData(langSelector);
    fillFields(data, editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, editHandler(editWrapper, langSelector));
    hideLoader(editWrapper);
};

const requestLangSelectors = async () => {
    const response = await fetch(`/api/language/selectors`);
    const data = await response.json();
    data.forEach((dataItem) => {
        const elementNodeList = document.querySelectorAll(`.${dataItem}`);
        if (!elementNodeList.length) return false;
        elementNodeList.forEach((elementNode) => {
            elementNode.classList.add(`editable`);
            elementNode.dataset.langSelector = dataItem;
            elementNode.addEventListener(`click`, showEditableWindow);
        });
    });
};

const hideLangSelectors = async () => {
    const response = await fetch(`/api/language/selectors`);
    const data = await response.json();
    data.forEach((dataItem) => {
        const elementNodeList = document.querySelectorAll(`.${dataItem}`);
        if (!elementNodeList.length) return false;
        elementNodeList.forEach((elementNode) => {
            elementNode.classList.remove(`editable`);
            elementNode.removeAttribute(`data-lang-selector`);
            elementNode.removeEventListener(`click`, showEditableWindow);
        });
    });
};

const adminLangListener = () => {
    const eyeButton = document.querySelector(`.adminEye`);
    if (!eyeButton) return false;
    eyeButton.addEventListener(`click`, () => {
        const isActivated = (eyeButton.classList.contains(`activated`));
        const method = (isActivated) ? `remove` : `add`;
        eyeButton.classList[method](`activated`);
        if (isActivated) {
            return hideLangSelectors();
        }
        eyeButton.classList.add(`activated`);
        return requestLangSelectors();
    });
};

export const langAdmin = () => {
    adminLangListener();
};