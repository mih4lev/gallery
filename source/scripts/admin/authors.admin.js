import { cloneTemplate } from "./utils.admin";

const addAuthorListener = (event) => {
    event.preventDefault();
    const bodyNode = document.querySelector(`body`);
    const editWrapper = cloneTemplate(`.authorTemplate`);
    bodyNode.appendChild(editWrapper);
    const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
    if (!adminAuthorButton) return false;
    adminAuthorButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const body = {
            authorLink: editWrapper.querySelector(`.authorLink`).value,
            authorRU: editWrapper.querySelector(`.authorRU`).value,
            authorEN: editWrapper.querySelector(`.authorEN`).value,
            authorAboutRU: editWrapper.querySelector(`.authorAboutRU`).value,
            authorAboutEN: editWrapper.querySelector(`.authorAboutEN`).value,
            authorCityRU: editWrapper.querySelector(`.authorCityRU`).value,
            authorCityEN: editWrapper.querySelector(`.authorCityEN`).value,
        };
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        await fetch(`/api/authors/`, options);
        bodyNode.removeChild(editWrapper);
    });
    const closeButton = editWrapper.querySelector(`.templateCloseButton`);
    const closeWindow = () => bodyNode.removeChild(editWrapper);
    closeButton.addEventListener(`click`, closeWindow);
};

const buttonAddAuthorListener = () => {
    const adminAuthorAddButton = document.querySelector(`.adminAuthorAddButton`);
    if (!adminAuthorAddButton) return false;
    adminAuthorAddButton.addEventListener(`click`, addAuthorListener);
};

const removeAuthorListener = (event) => {
    event.preventDefault();
    const { dataset: { authorId }} = event.target;
    const bodyNode = document.querySelector(`body`);
    const editWrapper = cloneTemplate(`.authorDeleteTemplate`);
    bodyNode.appendChild(editWrapper);
    const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
    if (!adminAuthorButton) return false;
    adminAuthorButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const options = {
            method: `DELETE`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            }
        };
        const authorID = Number(authorId);
        await fetch(`/api/authors/${authorID}`, options);
        location.href = `/authors`;
    });
    const closeButton = editWrapper.querySelector(`.templateCloseButton`);
    const closeWindow = () => bodyNode.removeChild(editWrapper);
    closeButton.addEventListener(`click`, closeWindow);
};

const buttonRemoveAuthorListener = () => {
    const adminAuthorRemoveButton = document.querySelector(`.adminAuthorRemoveButton`);
    if (!adminAuthorRemoveButton) return false;
    adminAuthorRemoveButton.addEventListener(`click`, removeAuthorListener);
};

export const authorButtons = () => {
    buttonAddAuthorListener();
    buttonRemoveAuthorListener();
};