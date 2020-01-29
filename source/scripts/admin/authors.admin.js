import {
    cloneTemplate, collectData, hideLoader, hideTemplate,
    requestMainButton, showLoader
} from "./utils.admin";

const addHandler = (editWrapper) => {
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
        const response = await fetch(`/api/authors/`, options);
        const { code, insertID } = await response.json();
        if (code === 200) {
            location.href = `/authors/${insertID}`;
            return hideTemplate(editWrapper);
        }
        // add errors visible
    }
};

const deleteHandler = (authorID) => {
    return async (event) => {
        event.preventDefault();
        const options = {
            method: `DELETE`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            }
        };
        await fetch(`/api/authors/${authorID}`, options);
        location.href = `/authors`;
    }
};

export const addAuthor = (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.authorTemplate`);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper));
    hideLoader(editWrapper);
};

export const deleteAuthor = (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.authorDeleteTemplate`);
    const authorID = Number(event.target.dataset.authorId);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, deleteHandler(authorID));
    hideLoader(editWrapper);
};

const buttonAddAuthorListener = () => {
    const adminAuthorAddButton = document.querySelector(`.adminAuthorAddButton`);
    if (!adminAuthorAddButton) return false;
    adminAuthorAddButton.addEventListener(`click`, addAuthor);
};

const buttonRemoveAuthorListener = () => {
    const adminAuthorRemoveButton = document.querySelector(`.adminAuthorRemoveButton`);
    if (!adminAuthorRemoveButton) return false;
    adminAuthorRemoveButton.addEventListener(`click`, deleteAuthor);
};

export const authorButtons = () => {
    buttonAddAuthorListener();
    buttonRemoveAuthorListener();
};