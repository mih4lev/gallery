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
        const response = await fetch(`/api/rewards/${Number(authorID)}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const editHandler = (editWrapper, reward) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const rewardID = Number(reward.dataset.rewardId);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectData(editWrapper))
        };
        const response = await fetch(`/api/rewards/${rewardID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const deleteHandler = (editWrapper, reward) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const rewardID = Number(reward.dataset.rewardId);
        const options = { method: `DELETE` };
        const response = await fetch(`/api/rewards/${rewardID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            reward.parentNode.removeChild(reward);
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const selectData = async (reward) => {
    const rewardID = Number(reward.dataset.rewardId);
    const response = await fetch(`/api/rewards/${rewardID}`);
    return await response.json();
};

const addEditRewardListener = (reward) => {
    reward.classList.add(`editableItem`);
    reward.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const editWrapper = cloneTemplate(`.authorRewardTemplate`);
        // request fields value && fill them
        const data = await selectData(reward);
        fillFields(data, editWrapper);
        // button listeners
        const mainButton = requestMainButton(editWrapper, `Обновить`);
        mainButton.addEventListener(`click`, editHandler(editWrapper, reward));
        const deleteButton = editWrapper.querySelector(`.deleteButton`);
        deleteButton.addEventListener(`click`, deleteHandler(editWrapper, reward));
        hideLoader(editWrapper);
    });
};

const addRewardAddListeners = (event) => {
    event.preventDefault();
    const authorID = Number(event.target.dataset.authorId);
    const editWrapper = cloneTemplate(`.authorRewardTemplate`);
    hideLoader(editWrapper);
    hideDeleteButton(editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper, authorID));
};

const addEditRewardListeners = () => {
    const rewardEvents = [...document.querySelectorAll(`.rewardList .painterEvent`)];
    if (!rewardEvents.length) return false;
    rewardEvents.forEach(addEditRewardListener);
};

const addCreateRewardListener = () => {
    const adminRewardAddButton = document.querySelector(`.adminRewardAddButton`);
    if (!adminRewardAddButton) return false;
    adminRewardAddButton.addEventListener(`click`, addRewardAddListeners);
};

export const rewardAdmin = () => {
    addCreateRewardListener();
    addEditRewardListeners();
};