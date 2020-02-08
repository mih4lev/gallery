const bodyNode = document.querySelector(`body`);

export const cloneTemplate = (templateSelector) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    const editWrapper = templateWrapper.querySelector(`.editWrapper`);
    const closeButton = editWrapper.querySelector(`.closeButton`);
    const closeWindow = () => bodyNode.removeChild(editWrapper);
    closeButton.addEventListener(`click`, closeWindow);
    bodyNode.appendChild(editWrapper);
    // validateForm(editWrapper, `.templateField`);
    return editWrapper;
};

export const selectTemplate = (templateSelector, element) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    // validateForm(templateWrapper, `.subFormField`);
    return templateWrapper.querySelector(element);
};

const validateForm = (editWrapper, selector) => {
    const fields = [...editWrapper.querySelectorAll(selector)];
    const regExpMap = {
        place: /[^0-9]/,
        number: /[^0-9\,\.]/,
        text: /[^а-яА-Яa-zA-Z0-9\s\!\?\.\,\+\-\(\)\%\#\@\\\/\*\«\»\"\–\:\;]/,
        link: /[^a-z0-9\_\-]/,
        color: /[^a-zA-Z0-9\#]/,
        city: /[^а-яА-Яa-zA-Z0-9\s\.\,\-\(\)\#]/,
        header: /[^а-яА-Яa-zA-Z0-9\s\!\?\.\,\+\-\(\)\%\#\@\\\/\*\"\«\»]/,
        langRU: /[^а-яА-Я]/,
        langEN: /[^a-zA-Z]/,
        yearRU: /[^а-яА-Я0-9\s\-]/,
        yearEN: /[^a-zA-Z0-9\s\-]/,
        authorRU: /[^а-яА-Я\s\-]/,
        authorEN: /[^a-zA-Z\s\-]/,
        langSymbolsRU: /[^а-яА-Я0-9\s\!\?\.\,\+\-\(\)\%\#\@\\\/\*\"\«\»]/,
        langSymbolsEN: /[^a-zA-Z0-9\s\!\?\.\,\+\-\(\)\%\#\@\\\/\*\"\«\»]/
    };
    const regExp = /^[^0-9\,\.]{1,30}$/;
    fields.forEach((field) => {
        field.addEventListener(`input`, ({ target, target: { value, dataset: { validate }}}) => {
            const method = (regExpMap[validate].test(value)) ? `add` : `remove`;
            target.classList[method](`fieldHasError`);
            target.value = value.replace(regExpMap[validate], ``);
        });
        field.addEventListener(`focusout`, ({ target }) => target.classList.remove(`fieldHasError`));
    });
};

export const hideLoader = (editWrapper) => {
    const templateWrapper = editWrapper.querySelector(`.templateWrapper`);
    const templateLoader = editWrapper.querySelector(`.templateLoader`);
    templateWrapper.classList.remove(`templateWrapper--hidden`);
    if (!templateLoader) return false;
    templateLoader.style.display = `none`;
};

export const showLoader = (editWrapper) => {
    const templateWrapper = editWrapper.querySelector(`.templateWrapper`);
    const templateLoader = editWrapper.querySelector(`.templateLoader`);
    if (!templateLoader) return false;
    templateWrapper.classList.add(`templateWrapper--hidden`);
    templateLoader.style.display = `block`;
};

export const fillFields = (data, editWrapper) => {
    for (const fieldName in data) {
        if (data.hasOwnProperty(fieldName)) {
            const fieldNode = editWrapper.querySelector(`.${fieldName}`);
            if (!fieldNode) continue;
            fieldNode.value = data[fieldName];
        }
    }
};

export const collectData = (editWrapper) => {
    const fields = [...editWrapper.querySelectorAll(`.templateField`)];
    const data = {};
    fields.forEach((field) => {
        data[field.id] = field.value;
    });
    const selects = [...editWrapper.querySelectorAll(`.templateSelect`)];
    selects.forEach((select) => {
        const chosenLinks = [...select.querySelectorAll(`.chosenLink`)];
        if (!chosenLinks.length) return false;
        chosenLinks.forEach(({ dataset: { field, value }}) => {
            if (!data[field]) data[field] = [];
            data[field].push(value);
        });
    });
    return data;
};

export const collectDataInner = (formNode) => {
    const fields = [...formNode.querySelectorAll(`input[type="text"]`)];
    const data = {};
    fields.forEach((field) => {
        data[field.id] = field.value;
    });
    return data;
};

export const hideTemplate = (editWrapper) => bodyNode.removeChild(editWrapper);

export const hideDeleteButton = (editWrapper) => {
    const deleteButton = editWrapper.querySelector(`.deleteButton`);
    deleteButton.style.display = `none`;
};

export const requestMainButton = (editWrapper, title = false) => {
    const mainButton = editWrapper.querySelector(`.mainButton`);
    if (title) mainButton.innerText = title;
    return mainButton;
};

export const checkRequiredFields = (editWrapper) => {
    const requiredFields = [...editWrapper.querySelectorAll(`[data-required="true"]`)];
    let isValid = true;
    requiredFields.forEach((field) => {
        if (field.classList.contains(`templateSelect`)) {
            const checkedElements = [...field.querySelectorAll(`.chosenLink`)];
            if (checkedElements.length) return true;
            isValid = false;
            const selectLinks = [...field.querySelectorAll(`.selectLink`)];
            selectLinks.forEach((link) => {
                link.classList.add(`fieldHasError`);
                link.addEventListener(`click`, () => {
                    selectLinks.forEach((link) => link.classList.remove(`fieldHasError`));
                });
            });
            return false;
        }
        field.addEventListener(`input`, () => {
            field.classList.remove(`fieldHasError`);
        });
        if (field.value) return true;
        field.classList.add(`fieldHasError`);
        isValid = false;
    });
    return isValid;
};