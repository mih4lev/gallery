import {
    cloneTemplate, collectData, collectDataInner, fillFields,
    hideDeleteButton, hideLoader, hideTemplate, requestMainButton,
    selectTemplate, showLoader
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
        const { code, insertID } = await response.json();
        const linkResponse = await fetch(`/api/events/id/${insertID}`);
        const { eventLink } = await linkResponse.json();
        if (code === 200) {
            location.href = `/events/${eventLink}`;
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const editHandler = (editWrapper, eventId) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const eventID = Number(eventId);
        const newData = collectData(editWrapper);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(newData)
        };
        const response = await fetch(`/api/events/${eventID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            const { eventLink } = newData;
            location.href = `/events/${eventLink}`;
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const deleteHandler = (eventID, editWrapper) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const options = { method: `DELETE` };
        const response = await fetch(`/api/events/${eventID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.href = `/events`;
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
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

const closeAddCategoryForm = (createButton, categoryForm) => {
    return (event) => {
        event.preventDefault();
        createButton.removeChild(categoryForm);
    };
};

const createCategory = (createButton, categoryForm) => {
    return async (event) => {
        event.preventDefault();
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectDataInner(categoryForm))
        };
        const response = await fetch(`/api/categories`, options);
        const { code } = await response.json();
        if (code === 200) {
            //
            const editWrapper = categoryForm.closest(`.editWrapper`);
            const templateSelect = editWrapper.querySelector(`.templateSelect`);
            templateSelect.innerHTML = ``;
            templateSelect.appendChild(await requestCategories());
            return createButton.removeChild(categoryForm);
        }
    };
};

const showCategoryForm = (createButton) => {
    return async (event) => {
        event.preventDefault();
        const categoryForm = selectTemplate(`.createCategory`, `.createCategoryForm`);
        const closeButton = categoryForm.querySelector(`.closeCategoryButton`);
        closeButton.addEventListener(`click`, closeAddCategoryForm(createButton, categoryForm));
        const submitButton = categoryForm.querySelector(`.categoryButton`);
        submitButton.addEventListener(`click`, createCategory(createButton, categoryForm));
        createButton.appendChild(categoryForm);
    };
};

const requestCategories = async (activeCategoryID = false) => {
    const response = await fetch(`/api/categories`);
    const categories = await response.json();
    const templateList = selectTemplate(`.eventSelect`, `.templateList`);
    const templateItem = templateList.querySelector(`.templateItem`).cloneNode(true);
    templateList.innerHTML = ``;
    categories.forEach((category) => {
        const { categoryID, categoryTitleRU } = category;
        const templateClone = templateItem.cloneNode(true);
        const selectLink = templateClone.querySelector(`.selectLink`);
        selectLink.innerText = categoryTitleRU;
        selectLink.dataset.category = categoryID;
        if (activeCategoryID === categoryID) selectLink.classList.add(`chosenLink`);
        selectLink.addEventListener(`click`, selectClickHandler(templateList));
        templateList.appendChild(templateClone);
    });
    // add create category button
    const createButton = templateItem.cloneNode(true);
    const selectLink = createButton.querySelector(`.selectLink`);
    selectLink.classList.add(`createCategory`);
    selectLink.innerText = `Создать`;
    selectLink.addEventListener(`click`, showCategoryForm(createButton));
    templateList.appendChild(createButton);
    return templateList;
};

const selectData = async (eventId) => {
    const eventID = Number(eventId);
    const response = await fetch(`/api/events/id/${eventID}`);
    return await response.json();
};

export const addEvent = async (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.eventTemplate`);
    const templateSelect = editWrapper.querySelector(`.templateSelect`);
    templateSelect.appendChild(await requestCategories());
    hideLoader(editWrapper);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper));
};

export const deleteEvent = async (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.eventDeleteTemplate`);
    const eventID = Number(event.target.dataset.eventId);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, deleteHandler(eventID, editWrapper));
    hideLoader(editWrapper);
};

export const editEvent = async (event) => {
    event.preventDefault();
    const { target: { dataset: { eventId }}} = event;
    const editWrapper = cloneTemplate(`.eventTemplate`);
    const data = await selectData(eventId);
    fillFields(data, editWrapper);
    const templateSelect = editWrapper.querySelector(`.templateSelect`);
    templateSelect.appendChild(await requestCategories(data.categoryID));
    const mainButton = requestMainButton(editWrapper, `Обновить`);
    mainButton.addEventListener(`click`, editHandler(editWrapper, eventId));
    hideLoader(editWrapper);
};