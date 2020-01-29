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

export const selectTemplate = (templateSelector) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    return templateWrapper.querySelector(`.templateList`);
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
            if (!fieldNode) return false;
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
        const chosenLink = select.querySelector(`.chosenLink`);
        if (!chosenLink) return false;
        const { dataset: { category }} = chosenLink;
        data['categoryID'] = category;
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