import {
    cloneTemplate, collectData, fillFields, hideDeleteButton,
    hideLoader, hideTemplate, requestMainButton, selectTemplate, showLoader
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
        console.log(collectData(editWrapper));
        const response = await fetch(`/api/events`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
            return hideTemplate(editWrapper);
        }
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
            return hideTemplate(editWrapper);
        }
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
            return hideTemplate(editWrapper);
        }
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

const selectClickHandler = (templateList) => {
    return (event) => {
        event.preventDefault();
        const { target: selectLink } = event;
        const selectLinks = [...templateList.querySelectorAll(`.selectLink`)];
        selectLinks.forEach((link) => { link.classList.remove(`chosenLink`) });
        selectLink.classList.add(`chosenLink`);
    };
};

const requestCategories = async () => {
    const response = await fetch(`/api/categories`);
    const categories = await response.json();
    const templateList = selectTemplate(`.eventSelect`);
    const templateItem = templateList.querySelector(`.templateItem`).cloneNode(true);
    templateList.innerHTML = ``;
    categories.forEach((category) => {
        const { categoryID, categoryTitleRU } = category;
        const templateClone = templateItem.cloneNode(true);
        const selectLink = templateClone.querySelector(`.selectLink`);
        selectLink.innerText = categoryTitleRU;
        selectLink.dataset.category = categoryID;
        selectLink.addEventListener(`click`, selectClickHandler(templateList));
        templateList.appendChild(templateClone);
    });
    return templateList;
};

export const addEvent = async (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.eventTemplate`);
    const templateSelect = editWrapper.querySelector(`.templateSelect`);
    templateSelect.appendChild(await requestCategories());
    hideLoader(editWrapper);
    hideDeleteButton(editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper));
};