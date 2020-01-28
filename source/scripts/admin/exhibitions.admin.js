import { cloneTemplate } from "./utils.admin";

const addEditExhibitionListener = (exhibition) => {
    exhibition.classList.add(`editableItem`);
    exhibition.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const { dataset: { exhibitionId }} = exhibition;
        const exhibitionID = Number(exhibitionId);
        const response = await fetch(`/api/exhibitions/${exhibitionID}`);
        const data = await response.json();
        //
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorExhibitionsTemplate`);
        const exhibitionYearRU = editWrapper.querySelector(`.exhibitionYearRU`);
        const exhibitionYearEN = editWrapper.querySelector(`.exhibitionYearEN`);
        const exhibitionRU = editWrapper.querySelector(`.exhibitionRU`);
        const exhibitionEN = editWrapper.querySelector(`.exhibitionEN`);
        exhibitionYearRU.value = data.exhibitionYearRU;
        exhibitionYearEN.value = data.exhibitionYearEN;
        exhibitionRU.value = data.exhibitionRU;
        exhibitionEN.value = data.exhibitionEN;
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        adminAuthorButton.innerText = `Обновить`;
        bodyNode.appendChild(editWrapper);
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                exhibitionYearRU: exhibitionYearRU.value,
                exhibitionYearEN: exhibitionYearEN.value,
                exhibitionRU: exhibitionRU.value,
                exhibitionEN: exhibitionEN.value
            };
            const options = {
                method: `PUT`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            await fetch(`/api/exhibitions/${exhibitionID}`, options);
            bodyNode.removeChild(editWrapper);
        });
        const deleteButton = editWrapper.querySelector(`.adminDeleteButton`);
        deleteButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const options = { method: `DELETE` };
            const response = await fetch(`/api/exhibitions/${exhibitionID}`, options);
            const { code } = await response.json();
            if (code === 200) {
                const parent = exhibition.parentNode;
                parent.removeChild(exhibition);
                bodyNode.removeChild(editWrapper);
            }
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        const closeWindow = () => bodyNode.removeChild(editWrapper);
        closeButton.addEventListener(`click`, closeWindow);
    });
};

const addEditExhibitionListeners = () => {
    const exhibitionEvents = [...document.querySelectorAll(`.exhibitionList .painterEvent`)];
    if (!exhibitionEvents.length) return false;
    exhibitionEvents.forEach(addEditExhibitionListener);
};

const addExhibitionAddListeners = (event) => {
    event.preventDefault();
    const { dataset: { authorId: authorID }} = event.target;
    const bodyNode = document.querySelector(`body`);
    const editWrapper = cloneTemplate(`.authorExhibitionsTemplate`);
    const adminDeleteButton = editWrapper.querySelector(`.adminDeleteButton`);
    adminDeleteButton.style.display = `none`;
    bodyNode.appendChild(editWrapper);
    const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
    if (!adminAuthorButton) return false;
    adminAuthorButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        const exhibitionYearRU = editWrapper.querySelector(`.exhibitionYearRU`).value;
        const exhibitionYearEN = editWrapper.querySelector(`.exhibitionYearEN`).value;
        const exhibitionRU = editWrapper.querySelector(`.exhibitionRU`).value;
        const exhibitionEN = editWrapper.querySelector(`.exhibitionEN`).value;
        const body = { exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN };
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/exhibitions/${Number(authorID)}`, options);
        const { code, insertID } = await response.json();
        if (code === 200) {
            const parentNode = document.querySelector(`.exhibitionList`);
            if (!parentNode || !parentNode.children.length) return location.reload();
            const insertNode = parentNode.children[0].cloneNode(true);
            insertNode.dataset.exhibitionId = insertID;
            const insertTimeline = insertNode.querySelector(`.painterTimeline`);
            const insertText = insertNode.querySelector(`.painterText`);
            const pageLang = document.querySelector(`html`).getAttribute(`lang`);
            insertTimeline.innerText = (pageLang === `ru`) ? exhibitionYearRU : exhibitionYearEN;
            insertText.innerText = (pageLang === `ru`) ? exhibitionRU : exhibitionEN;
            addEditExhibitionListener(insertNode);
            parentNode.appendChild(insertNode);
            bodyNode.removeChild(editWrapper);
        }
    });
    const closeButton = editWrapper.querySelector(`.templateCloseButton`);
    const closeWindow = () => bodyNode.removeChild(editWrapper);
    closeButton.addEventListener(`click`, closeWindow);
};

const addCreateExhibitionListener = () => {
    const adminExhibitionAddButton = document.querySelector(`.adminExhibitionAddButton`);
    if (!adminExhibitionAddButton) return false;
    adminExhibitionAddButton.addEventListener(`click`, addExhibitionAddListeners);
};

export const exhibitionAdmin = () => {
    addCreateExhibitionListener();
    addEditExhibitionListeners();
};