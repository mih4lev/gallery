import {
    cloneTemplate, collectData, hideLoader, hideTemplate,
    requestMainButton, showLoader, fillFields
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
        }
        hideTemplate(editWrapper);
        // add errors visible
    }
};

const editHandler = (editWrapper, authorId) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const authorID = Number(authorId);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectData(editWrapper))
        };
        const response = await fetch(`/api/authors/${authorID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
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

const selectData = async (authorId) => {
    const authorID = Number(authorId);
    const response = await fetch(`/api/authors/${authorID}`);
    return await response.json();
};

export const addAuthor = (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.authorTemplate`);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper));
    hideLoader(editWrapper);
};

export const editAuthor = async (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.authorTemplate`);
    const { target: { dataset: { authorId }}} = event;
    const data = await selectData(authorId);
    fillFields(data, editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.innerText = `Обновить`;
    mainButton.addEventListener(`click`, editHandler(editWrapper, authorId));
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