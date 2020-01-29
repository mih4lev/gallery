import {
    cloneTemplate, collectData, fillFields, hideDeleteButton,
    hideLoader, hideTemplate, requestMainButton, showLoader
} from "./utils.admin";

const addHandler = (editWrapper, authorID) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectData(editWrapper))
        };
        const response = await fetch(`/api/exhibitions/${Number(authorID)}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
            return hideTemplate(editWrapper);
        }
        // add errors visible
    };
};

const editHandler = (editWrapper, exhibition) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const exhibitionID = Number(exhibition.dataset.exhibitionId);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectData(editWrapper))
        };
        const response = await fetch(`/api/exhibitions/${exhibitionID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
            return hideTemplate(editWrapper);
        }
        // add errors visible
    };
};

const deleteHandler = (editWrapper, exhibition) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const exhibitionID = Number(exhibition.dataset.exhibitionId);
        const options = { method: `DELETE` };
        const response = await fetch(`/api/exhibitions/${exhibitionID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            exhibition.parentNode.removeChild(exhibition);
            return hideTemplate(editWrapper);
        }
        // add errors visible
    };
};

const selectData = async (exhibition) => {
    const exhibitionID = Number(exhibition.dataset.exhibitionId);
    const response = await fetch(`/api/exhibitions/${exhibitionID}`);
    return await response.json();
};

const addEditExhibitionListener = (exhibition) => {
    exhibition.classList.add(`editableItem`);
    exhibition.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const editWrapper = cloneTemplate(`.authorExhibitionTemplate`);
        // request fields value && fill them
        const data = await selectData(exhibition);
        fillFields(data, editWrapper);
        // button listeners
        const mainButton = requestMainButton(editWrapper, `Обновить`);
        mainButton.addEventListener(`click`, editHandler(editWrapper, exhibition));
        const deleteButton = editWrapper.querySelector(`.deleteButton`);
        deleteButton.addEventListener(`click`, deleteHandler(editWrapper, exhibition));
        hideLoader(editWrapper);
    });
};

const addExhibitionAddListeners = (event) => {
    event.preventDefault();
    const authorID = Number(event.target.dataset.authorId);
    const editWrapper = cloneTemplate(`.authorExhibitionTemplate`);
    hideLoader(editWrapper);
    hideDeleteButton(editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper, authorID));
};

const addEditExhibitionListeners = () => {
    const exhibitionEvents = [...document.querySelectorAll(`.exhibitionList .painterEvent`)];
    if (!exhibitionEvents.length) return false;
    exhibitionEvents.forEach(addEditExhibitionListener);
};

const addCreateExhibitionListener = () => {
    const adminExhibitionAddButton = document.querySelector(`.adminExhibitionAddButton`);
    if (!adminExhibitionAddButton) return false;
    adminExhibitionAddButton.addEventListener(`click`, addExhibitionAddListeners);
};

export const exhibitionAdmin = () => {
    addCreateExhibitionListener();
    addEditExhibitionListeners();
};