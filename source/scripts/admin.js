import { cloneTemplate } from "./admin/utils.admin";
import { authorButtons } from "./admin/authors.admin";
import { educationAdmin } from "./admin/educations.admin";
import { rewardAdmin } from "./admin/rewards.admin";
import { exhibitionAdmin } from "./admin/exhibitions.admin";

const showEditableWindow = async (event) => {
    event.preventDefault();
    const bodyNode = document.querySelector(`body`);
    const { target: { dataset: { langSelector }}} = event;
    const response = await fetch(`/api/language/selector/${langSelector}`);
    const { langRU, langEN } = await response.json();
    const editWrapper = cloneTemplate(`.langTemplate`);
    const fieldRU = editWrapper.querySelector(`.fieldRU`);
    fieldRU.value = langRU;
    const fieldEN = editWrapper.querySelector(`.fieldEN`);
    fieldEN.value = langEN;
    const submitButton = editWrapper.querySelector(`.templateButton`);
    submitButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        submitButton.innerText = `Сохраняю...`;
        submitButton.classList.add(`requestingStatus`);
        submitButton.setAttribute(`disabled`, `disabled`);
        const body = {
            langRU: fieldRU.value,
            langEN: fieldEN.value
        };
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/language/${langSelector}`, options);
        await response.json();
        const pageLang = document.querySelector(`html`).getAttribute(`lang`);
        const langNodes = [...document.querySelectorAll(`.${langSelector}`)];
        langNodes.forEach((node) => {
            node.innerText = (pageLang === `ru`) ? fieldRU.value : fieldEN.value;
        });
        bodyNode.removeChild(editWrapper);
    });
    const closeButton = editWrapper.querySelector(`.templateCloseButton`);
    closeButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        bodyNode.removeChild(editWrapper);
    });
    bodyNode.appendChild(editWrapper);
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

const adminEye = document.querySelector(`.adminEye`);
adminEye.addEventListener(`click`, () => {
    const isActivated = (adminEye.classList.contains(`activated`));
    const method = (isActivated) ? `remove` : `add`;
    adminEye.classList[method](`activated`);
    if (isActivated) {
        return hideLangSelectors();
    }
    adminEye.classList.add(`activated`);
    return requestLangSelectors();
});

authorButtons();
educationAdmin();
rewardAdmin();
exhibitionAdmin();