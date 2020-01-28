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
        rewardYearRU.value = data.rewardYearRU;
        rewardYearEN.value = data.rewardYearEN;
        rewardRU.value = data.rewardRU;
        rewardEN.value = data.rewardEN;
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        adminAuthorButton.innerText = `Обновить`;
        bodyNode.appendChild(editWrapper);
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                rewardYearRU: rewardYearRU.value,
                rewardYearEN: rewardYearEN.value,
                rewardRU: rewardRU.value,
                rewardEN: rewardEN.value
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
                const rewardTimeline = reward.querySelector(`.painterTimeline`);
                const rewardText = reward.querySelector(`.painterText`);
                const pageLang = document.querySelector(`html`).getAttribute(`lang`);
                rewardTimeline.innerText = (pageLang === `ru`) ? rewardYearRU.value : rewardYearEN.value;
                rewardText.innerText = (pageLang === `ru`) ? rewardRU.value : rewardEN.value;
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
        const body = { rewardYearRU, rewardYearEN, rewardRU, rewardEN };
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/rewards/${Number(authorID)}`, options);
        const { code, insertID } = await response.json();
        if (code === 200) {
            const parentNode = document.querySelector(`.rewardList`);
            if (!parentNode || !parentNode.children.length) return location.reload();
            const insertNode = parentNode.children[0].cloneNode(true);
            insertNode.dataset.rewardId = insertID;
            const insertTimeline = insertNode.querySelector(`.painterTimeline`);
            const insertText = insertNode.querySelector(`.painterText`);
            const pageLang = document.querySelector(`html`).getAttribute(`lang`);
            insertTimeline.innerText = (pageLang === `ru`) ? rewardYearRU : rewardYearEN;
            insertText.innerText = (pageLang === `ru`) ? rewardRU : rewardEN;
            addEditRewardListener(insertNode);
            parentNode.appendChild(insertNode);
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