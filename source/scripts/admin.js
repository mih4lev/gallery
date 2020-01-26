const showEditableWindow = async (event) => {
    event.preventDefault();
    const bodyNode = document.querySelector(`body`);
    const { target: { dataset: { langSelector }}} = event;
    const response = await fetch(`/api/language/selector/${langSelector}`);
    const { langRU, langEN } = await response.json();
    const template = document.querySelector(`.langTemplate`);
    const templateWrapper = template.content.cloneNode(true);
    const editWrapper = templateWrapper.querySelector(`.editWrapper`);
    const fieldRU = editWrapper.querySelector(`.fieldRU`);
    fieldRU.value = langRU;
    const fieldEN = editWrapper.querySelector(`.fieldEN`);
    fieldEN.value = langEN;
    const submitButton = editWrapper.querySelector(`.templateButton`);
    submitButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        submitButton.innerText = `Сохраняю...`;
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
        const data = await response.json();
        if (code !== 200) {
            submitButton.innerText = `Ошибка сохранения`;
            return false;
        }
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
requestLangSelectors();