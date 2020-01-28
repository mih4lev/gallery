import { cloneTemplate } from "./utils.admin";

const addEditRewardListener = (reward) => {
    reward.classList.add(`editableItem`);
    reward.addEventListener(`click`, async (event) => {
        const { dataset: { rewardId }} = reward;
        const rewardID = Number(rewardId);
        event.preventDefault();
        // select data
        const response = await fetch(`/api/rewards/${rewardID}`);
        const data = await response.json();
        //
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorRewardsTemplate`);
        const rewardYearRU = editWrapper.querySelector(`.rewardYearRU`);
        const rewardYearEN = editWrapper.querySelector(`.rewardYearEN`);
        const rewardRU = editWrapper.querySelector(`.rewardRU`);
        const rewardEN = editWrapper.querySelector(`.rewardEN`);
        const rewardPlace = editWrapper.querySelector(`.rewardPlace`);
        rewardYearRU.value = data.rewardYearRU;
        rewardYearEN.value = data.rewardYearEN;
        rewardRU.value = data.rewardRU;
        rewardEN.value = data.rewardEN;
        rewardPlace.value = data.rewardPlace;
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        adminAuthorButton.innerText = `Обновить`;
        bodyNode.appendChild(editWrapper);
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                rewardYearRU: rewardYearRU.value,
                rewardYearEN: rewardYearEN.value,
                rewardRU: rewardRU.value,
                rewardEN: rewardEN.value,
                rewardPlace: rewardPlace.value
            };
            const options = {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            const response = await fetch(`/api/rewards/${rewardID}`, options);
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
            const response = await fetch(`/api/rewards/${rewardID}`, options);
            const { code } = await response.json();
            if (code === 200) {
                const parent = reward.parentNode;
                parent.removeChild(reward);
                bodyNode.removeChild(editWrapper);
            }
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        const closeWindow = () => bodyNode.removeChild(editWrapper);
        closeButton.addEventListener(`click`, closeWindow);
    });
};

const addEditRewardListeners = () => {
    const rewardEvents = [...document.querySelectorAll(`.rewardList .painterEvent`)];
    if (!rewardEvents.length) return false;
    rewardEvents.forEach(addEditRewardListener);
};

const addRewardAddListeners = (event) => {
    event.preventDefault();
    const { dataset: { authorId: authorID }} = event.target;
    const bodyNode = document.querySelector(`body`);
    const editWrapper = cloneTemplate(`.authorRewardsTemplate`);
    const adminDeleteButton = editWrapper.querySelector(`.adminDeleteButton`);
    adminDeleteButton.style.display = `none`;
    bodyNode.appendChild(editWrapper);
    const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
    if (!adminAuthorButton) return false;
    adminAuthorButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const rewardYearRU = editWrapper.querySelector(`.rewardYearRU`).value;
        const rewardYearEN = editWrapper.querySelector(`.rewardYearEN`).value;
        const rewardRU = editWrapper.querySelector(`.rewardRU`).value;
        const rewardEN = editWrapper.querySelector(`.rewardEN`).value;
        const rewardPlace = editWrapper.querySelector(`.rewardPlace`).value;
        const body = { rewardYearRU, rewardYearEN, rewardRU, rewardEN, rewardPlace };
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/rewards/${Number(authorID)}`, options);
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

const addCreateRewardListener = () => {
    const adminRewardAddButton = document.querySelector(`.adminRewardAddButton`);
    if (!adminRewardAddButton) return false;
    adminRewardAddButton.addEventListener(`click`, addRewardAddListeners);
};

export const rewardAdmin = () => {
    addCreateRewardListener();
    addEditRewardListeners();
};