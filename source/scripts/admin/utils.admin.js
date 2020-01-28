export const cloneTemplate = (templateSelector) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    return templateWrapper.querySelector(`.editWrapper`);
};