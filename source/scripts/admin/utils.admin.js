const bodyNode = document.querySelector(`body`);

export const cloneTemplate = (templateSelector) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    const editWrapper = templateWrapper.querySelector(`.editWrapper`);
    const closeButton = editWrapper.querySelector(`.closeButton`);
    const closeWindow = () => bodyNode.removeChild(editWrapper);
    closeButton.addEventListener(`click`, closeWindow);
    bodyNode.appendChild(editWrapper);
    return editWrapper;
};

export const selectTemplate = (templateSelector, element) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    return templateWrapper.querySelector(element);
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