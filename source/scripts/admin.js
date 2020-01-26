const showEditableWindow = async ({ target }) => {
    const { dataset: { langSelector }} = target;
    const response = await fetch(`/api/language/selector/${langSelector}`);
    const data = await response.json();
    
    const editWrapper = document.createElement(`div`);
    editWrapper.classList.add(`editWrapper`);
    document.body.appendChild(editWrapper);
    console.log(`check`);
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