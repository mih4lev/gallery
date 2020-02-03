import {
    cloneTemplate,
    collectData,
    fillFields,
    hideLoader,
    hideTemplate,
    requestMainButton,
    showLoader
} from "./utils.admin";

const editHandler = (editWrapper, pageID) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const newData = collectData(editWrapper);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(newData)
        };
        const response = await fetch(`/api/pages/${pageID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const selectData = async (pageLink) => {
    const response = await fetch(`/api/pages/${pageLink}`);
    return await response.json();
};

export const editOptions = async (event) => {
    event.preventDefault();
    const { target: { dataset: { pageLink }}} = event;
    const editWrapper = cloneTemplate(`.optionsTemplate`);
    const data = await selectData(pageLink);
    fillFields(data[0], editWrapper);
    //
    const mainButton = requestMainButton(editWrapper, `Обновить`);
    mainButton.addEventListener(`click`, editHandler(editWrapper, data[0].pageID));
    hideLoader(editWrapper);
};