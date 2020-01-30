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
        const response = await fetch(`/api/educations/${Number(authorID)}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const editHandler = (editWrapper, education) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const educationID = Number(education.dataset.educationId);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectData(editWrapper))
        };
        const response = await fetch(`/api/educations/${educationID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const deleteHandler = (editWrapper, education) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const educationID = Number(education.dataset.educationId);
        const options = { method: `DELETE` };
        const response = await fetch(`/api/educations/${educationID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            education.parentNode.removeChild(education);
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const selectData = async (education) => {
    const educationID = Number(education.dataset.educationId);
    const response = await fetch(`/api/educations/${educationID}`);
    return await response.json();
};

const addEditEducationListener = (education) => {
    education.classList.add(`editableItem`);
    education.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const editWrapper = cloneTemplate(`.authorEducationTemplate`);
        const data = await selectData(education);
        fillFields(data, editWrapper);
        const mainButton = requestMainButton(editWrapper, `Обновить`);
        mainButton.addEventListener(`click`, editHandler(editWrapper, education));
        const deleteButton = editWrapper.querySelector(`.deleteButton`);
        deleteButton.addEventListener(`click`, deleteHandler(editWrapper, education));
        hideLoader(editWrapper);
    });
};

const addEducationAddListeners = (event) => {
    event.preventDefault();
    const authorID = Number(event.target.dataset.authorId);
    const editWrapper = cloneTemplate(`.authorEducationTemplate`);
    hideLoader(editWrapper);
    hideDeleteButton(editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper, authorID));
};

const addEditEducationListeners = () => {
    const educationEvents = [...document.querySelectorAll(`.educationList .painterEvent`)];
    if (!educationEvents.length) return false;
    educationEvents.forEach(addEditEducationListener);
};

const addCreateEducationListener = () => {
    const adminEducationAddButton = document.querySelector(`.adminEducationAddButton`);
    if (!adminEducationAddButton) return false;
    adminEducationAddButton.addEventListener(`click`, addEducationAddListeners);
};

export const educationAdmin = () => {
    addCreateEducationListener();
    addEditEducationListeners();
};