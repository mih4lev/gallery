import { cloneTemplate } from "./admin/utils.admin";
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

const adminAuthorAddButton = document.querySelector(`.adminAuthorAddButton`);
if (adminAuthorAddButton) {
    adminAuthorAddButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorTemplate`);
        bodyNode.appendChild(editWrapper);
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        if (!adminAuthorButton) return false;
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                authorLink: editWrapper.querySelector(`.authorLink`).value,
                authorRU: editWrapper.querySelector(`.authorRU`).value,
                authorEN: editWrapper.querySelector(`.authorEN`).value,
                authorAboutRU: editWrapper.querySelector(`.authorAboutRU`).value,
                authorAboutEN: editWrapper.querySelector(`.authorAboutEN`).value,
                authorCityRU: editWrapper.querySelector(`.authorCityRU`).value,
                authorCityEN: editWrapper.querySelector(`.authorCityEN`).value,
            };
            const options = {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            await fetch(`/api/authors/`, options);
            bodyNode.removeChild(editWrapper);
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        const closeWindow = () => bodyNode.removeChild(editWrapper);
        closeButton.addEventListener(`click`, closeWindow);
    });
}

const adminAuthorRemoveButton = document.querySelector(`.adminAuthorRemoveButton`);
if (adminAuthorRemoveButton) {
    adminAuthorRemoveButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorDeleteTemplate`);
        bodyNode.appendChild(editWrapper);
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        if (!adminAuthorButton) return false;
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const options = {
                method: `DELETE`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                }
            };
            const authorID = 13;
            await fetch(`/api/authors/${authorID}`, options);
            location.href = `/authors`;
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        const closeWindow = () => bodyNode.removeChild(editWrapper);
        closeButton.addEventListener(`click`, closeWindow);
    });
}

const moveEducationsArrows = [...document.querySelectorAll(`.educationList .adminMoveButton`)];
if (moveEducationsArrows.length) {
    moveEducationsArrows.forEach((button, index) => {
        if (index === 0) button.style.display = `none`;
        button.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const options = {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                }
            };
            await fetch(`/api/educations/place/7/6`, options);
        });
    });
}

const moveExhibitionsArrows = [...document.querySelectorAll(`.exhibitionList .adminMoveButton`)];
if (moveExhibitionsArrows.length) {
    moveExhibitionsArrows.forEach((button, index) => {
        if (index === 0) button.style.display = `none`;
        button.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const options = {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                }
            };
            await fetch(`/api/exhibitions/place/7/6`, options);
        });
    });
}

const moveRewardsArrows = [...document.querySelectorAll(`.rewardList .adminMoveButton`)];
if (moveRewardsArrows.length) {
    moveRewardsArrows.forEach((button, index) => {
        if (index === 0) button.style.display = `none`;
        button.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const options = {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                }
            };
            await fetch(`/api/rewards/place/7/6`, options);
        });
    });
}

educationAdmin();
rewardAdmin();
exhibitionAdmin();