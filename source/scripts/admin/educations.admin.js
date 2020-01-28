import { cloneTemplate } from "./utils.admin";

const addEditEducationListener = (education) => {
    education.classList.add(`editableItem`);
    education.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const { dataset: { educationId }} = education;
        const educationID = Number(educationId);
        const response = await fetch(`/api/educations/${educationID}`);
        const data = await response.json();
        //
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorEducationTemplate`);
        const educationYearRU = editWrapper.querySelector(`.educationYearRU`);
        const educationYearEN = editWrapper.querySelector(`.educationYearEN`);
        const educationRU = editWrapper.querySelector(`.educationRU`);
        const educationEN = editWrapper.querySelector(`.educationEN`);
        const educationPlace = editWrapper.querySelector(`.educationPlace`);
        educationYearRU.value = data.educationYearRU;
        educationYearEN.value = data.educationYearEN;
        educationRU.value = data.educationRU;
        educationEN.value = data.educationEN;
        educationPlace.value = data.educationPlace;
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        adminAuthorButton.innerText = `Обновить`;
        bodyNode.appendChild(editWrapper);
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                educationYearRU: educationYearRU.value,
                educationYearEN: educationYearEN.value,
                educationRU: educationRU.value,
                educationEN: educationEN.value,
                educationPlace: educationPlace.value
            };
            const options = {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            const response = await fetch(`/api/educations/${educationID}`, options);
            const { code } = await response.json();
            if (code === 200) {
                location.reload();
                bodyNode.removeChild(editWrapper);
            }
        });
        const deleteButton = editWrapper.querySelector(`.adminDeleteButton`);
        deleteButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const options = { method: `DELETE` };
            const response = await fetch(`/api/educations/${educationID}`, options);
            const { code } = await response.json();
            if (code === 200) {
                const parent = education.parentNode;
                parent.removeChild(education);
                bodyNode.removeChild(editWrapper);
            }
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        const closeWindow = () => bodyNode.removeChild(editWrapper);
        closeButton.addEventListener(`click`, closeWindow);
    });
};

const addEditEducationListeners = () => {
    const educationEvents = [...document.querySelectorAll(`.educationList .painterEvent`)];
    if (!educationEvents.length) return false;
    educationEvents.forEach(addEditEducationListener);
};

const addEducationAddListeners = (event) => {
    event.preventDefault();
    const { dataset: { authorId: authorID }} = event.target;
    const bodyNode = document.querySelector(`body`);
    const editWrapper = cloneTemplate(`.authorEducationTemplate`);
    const adminDeleteButton = editWrapper.querySelector(`.adminDeleteButton`);
    adminDeleteButton.style.display = `none`;
    bodyNode.appendChild(editWrapper);
    const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
    if (!adminAuthorButton) return false;
    adminAuthorButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const educationYearRU = editWrapper.querySelector(`.educationYearRU`).value;
        const educationYearEN = editWrapper.querySelector(`.educationYearEN`).value;
        const educationRU = editWrapper.querySelector(`.educationRU`).value;
        const educationEN = editWrapper.querySelector(`.educationEN`).value;
        const educationPlace = editWrapper.querySelector(`.educationPlace`).value;
        const body = {
            educationYearRU, educationYearEN, educationRU, educationEN, educationPlace
        };
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/educations/${Number(authorID)}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
            bodyNode.removeChild(editWrapper);
        }
    });
    const closeButton = editWrapper.querySelector(`.templateCloseButton`);
    const closeWindow = () => bodyNode.removeChild(editWrapper);
    closeButton.addEventListener(`click`, closeWindow);
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