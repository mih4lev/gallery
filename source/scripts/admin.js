const cloneTemplate = (templateSelector) => {
    const template = document.querySelector(templateSelector);
    const templateWrapper = template.content.cloneNode(true);
    return templateWrapper.querySelector(`.editWrapper`);
};

const showEditableWindow = async (event) => {
    event.preventDefault();
    const bodyNode = document.querySelector(`body`);
    const { target: { dataset: { langSelector }}} = event;
    const response = await fetch(`/api/language/selector/${langSelector}`);
    const { langRU, langEN } = await response.json();
    const editWrapper = cloneTemplate(`.langTemplate`);
    const fieldRU = editWrapper.querySelector(`.fieldRU`);
    fieldRU.value = langRU;
    const fieldEN = editWrapper.querySelector(`.fieldEN`);
    fieldEN.value = langEN;
    const submitButton = editWrapper.querySelector(`.templateButton`);
    submitButton.addEventListener(`click`, async (event) => {
        event.preventDefault();
        submitButton.innerText = `Сохраняю...`;
        submitButton.classList.add(`requestingStatus`);
        submitButton.setAttribute(`disabled`, `disabled`);
        const body = {
            langRU: fieldRU.value,
            langEN: fieldEN.value
        };
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(`/api/language/${langSelector}`, options);
        await response.json();
        const pageLang = document.querySelector(`html`).getAttribute(`lang`);
        const langNodes = [...document.querySelectorAll(`.${langSelector}`)];
        langNodes.forEach((node) => {
            node.innerText = (pageLang === `ru`) ? fieldRU.value : fieldEN.value;
        });
        bodyNode.removeChild(editWrapper);
    });
    const closeButton = editWrapper.querySelector(`.templateCloseButton`);
    closeButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        bodyNode.removeChild(editWrapper);
    });
    bodyNode.appendChild(editWrapper);
};

const requestLangSelectors = async () => {
    const response = await fetch(`/api/language/selectors`);
    const data = await response.json();
    data.forEach((dataItem) => {
        const elementNodeList = document.querySelectorAll(`.${dataItem}`);
        if (!elementNodeList.length) return false;
        elementNodeList.forEach((elementNode) => {
            elementNode.classList.add(`editable`);
            elementNode.dataset.langSelector = dataItem;
            elementNode.addEventListener(`click`, showEditableWindow);
        });
    });
};

const hideLangSelectors = async () => {
    const response = await fetch(`/api/language/selectors`);
    const data = await response.json();
    data.forEach((dataItem) => {
        const elementNodeList = document.querySelectorAll(`.${dataItem}`);
        if (!elementNodeList.length) return false;
        elementNodeList.forEach((elementNode) => {
            elementNode.classList.remove(`editable`);
            elementNode.removeAttribute(`data-lang-selector`);
            elementNode.removeEventListener(`click`, showEditableWindow);
        });
    });
};

const adminEye = document.querySelector(`.adminEye`);
adminEye.addEventListener(`click`, () => {
    const isActivated = (adminEye.classList.contains(`activated`));
    const method = (isActivated) ? `remove` : `add`;
    adminEye.classList[method](`activated`);
    if (isActivated) {
        return hideLangSelectors();
    }
    adminEye.classList.add(`activated`);
    return requestLangSelectors();
});

const adminAuthorAddButton = document.querySelector(`.adminAuthorAddButton`);
if (adminAuthorAddButton) {
    adminAuthorAddButton.addEventListener(`click`, (event) => {
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
        closeButton.addEventListener(`click`, (event) => {
            event.preventDefault();
            bodyNode.removeChild(editWrapper);
        });
    });
}

const adminAuthorRemoveButton = document.querySelector(`.adminAuthorRemoveButton`);
if (adminAuthorRemoveButton) {
    adminAuthorRemoveButton.addEventListener(`click`, (event) => {
        event.preventDefault();
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
            const authorID = 13;
            await fetch(`/api/authors/${authorID}`, options);
            location.href = `/authors`;
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        closeButton.addEventListener(`click`, (event) => {
            event.preventDefault();
            bodyNode.removeChild(editWrapper);
        });
    });
}

const adminEducationAddButton = document.querySelector(`.adminEducationAddButton`);
if (adminEducationAddButton) {
    adminEducationAddButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorEducationTemplate`);
        const adminDeleteButton = editWrapper.querySelector(`.adminDeleteButton`);
        adminDeleteButton.style.display = `none`;
        bodyNode.appendChild(editWrapper);
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        if (!adminAuthorButton) return false;
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                educationYearRU: editWrapper.querySelector(`.educationYearRU`).value,
                educationYearEN: editWrapper.querySelector(`.educationYearEN`).value,
                educationRU: editWrapper.querySelector(`.educationRU`).value,
                educationEN: editWrapper.querySelector(`.educationEN`).value
            };
            const options = {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            const authorID = 1;
            await fetch(`/api/educations/${authorID}`, options);
            bodyNode.removeChild(editWrapper);
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        closeButton.addEventListener(`click`, (event) => {
            event.preventDefault();
            bodyNode.removeChild(editWrapper);
        });
    });
}

const adminRewardsAddButton = document.querySelector(`.adminRewardsAddButton`);
if (adminRewardsAddButton) {
    adminRewardsAddButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorRewardsTemplate`);
        const adminDeleteButton = editWrapper.querySelector(`.adminDeleteButton`);
        adminDeleteButton.style.display = `none`;
        bodyNode.appendChild(editWrapper);
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        if (!adminAuthorButton) return false;
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                rewardYearRU: editWrapper.querySelector(`.rewardYearRU`).value,
                rewardYearEN: editWrapper.querySelector(`.rewardYearEN`).value,
                rewardRU: editWrapper.querySelector(`.rewardRU`).value,
                rewardEN: editWrapper.querySelector(`.rewardEN`).value
            };
            const options = {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            const authorID = 1;
            await fetch(`/api/rewards/${authorID}`, options);
            bodyNode.removeChild(editWrapper);
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        closeButton.addEventListener(`click`, (event) => {
            event.preventDefault();
            bodyNode.removeChild(editWrapper);
        });
    });
}

const adminExhibitionAddButton = document.querySelector(`.adminExhibitionAddButton`);
if (adminExhibitionAddButton) {
    adminExhibitionAddButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        const bodyNode = document.querySelector(`body`);
        const editWrapper = cloneTemplate(`.authorExhibitionsTemplate`);
        const adminDeleteButton = editWrapper.querySelector(`.adminDeleteButton`);
        adminDeleteButton.style.display = `none`;
        bodyNode.appendChild(editWrapper);
        const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
        if (!adminAuthorButton) return false;
        adminAuthorButton.addEventListener(`click`, async (event) => {
            event.preventDefault();
            const body = {
                exhibitionYearRU: editWrapper.querySelector(`.exhibitionYearRU`).value,
                exhibitionYearEN: editWrapper.querySelector(`.exhibitionYearEN`).value,
                exhibitionRU: editWrapper.querySelector(`.exhibitionRU`).value,
                exhibitionEN: editWrapper.querySelector(`.exhibitionEN`).value
            };
            const options = {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json;charset=utf-8`
                },
                body: JSON.stringify(body)
            };
            const authorID = 1;
            await fetch(`/api/exhibitions/${authorID}`, options);
            bodyNode.removeChild(editWrapper);
        });
        const closeButton = editWrapper.querySelector(`.templateCloseButton`);
        closeButton.addEventListener(`click`, (event) => {
            event.preventDefault();
            bodyNode.removeChild(editWrapper);
        });
    });
}

const educationEvents = [...document.querySelectorAll(`.educationList .painterEvent`)];
if (educationEvents.length) {
    educationEvents.forEach((event) => {
        event.classList.add(`editableItem`);
        event.addEventListener(`click`, async (event) => {
            event.preventDefault();
            // select data
            const educationID = 1;
            const response = await fetch(`/api/educations/${educationID}`);
            const data = await response.json();
            //
            const bodyNode = document.querySelector(`body`);
            const editWrapper = cloneTemplate(`.authorEducationTemplate`);
            const educationYearRU = editWrapper.querySelector(`.educationYearRU`);
            const educationYearEN = editWrapper.querySelector(`.educationYearEN`);
            const educationRU = editWrapper.querySelector(`.educationRU`);
            const educationEN = editWrapper.querySelector(`.educationEN`);
            educationYearRU.value = data.educationYearRU;
            educationYearEN.value = data.educationYearEN;
            educationRU.value = data.educationRU;
            educationEN.value = data.educationEN;
            const adminAuthorButton = editWrapper.querySelector(`.adminAuthorButton`);
            adminAuthorButton.innerText = `Обновить`;
            bodyNode.appendChild(editWrapper);
            adminAuthorButton.addEventListener(`click`, async (event) => {
                event.preventDefault();
                const body = {
                    educationYearRU: educationYearRU.value,
                    educationYearEN: educationYearEN.value,
                    educationRU: educationRU.value,
                    educationEN: educationEN.value
                };
                const options = {
                    method: `PUT`,
                    headers: {
                        'Content-Type': `application/json;charset=utf-8`
                    },
                    body: JSON.stringify(body)
                };
                const educationID = 1;
                await fetch(`/api/educations/${educationID}`, options);
                bodyNode.removeChild(editWrapper);
            });
            const deleteButton = editWrapper.querySelector(`.adminDeleteButton`);
            deleteButton.addEventListener(`click`, async (event) => {
                event.preventDefault();
                const options = { method: `DELETE` };
                const educationID = 4;
                await fetch(`/api/educations/${educationID}`, options);
                bodyNode.removeChild(editWrapper);
            });
            const closeButton = editWrapper.querySelector(`.templateCloseButton`);
            closeButton.addEventListener(`click`, (event) => {
                event.preventDefault();
                bodyNode.removeChild(editWrapper);
            });
        });
    });
}

const exhibitionEvents = [...document.querySelectorAll(`.exhibitionList .painterEvent`)];
if (exhibitionEvents.length) {
    exhibitionEvents.forEach((event) => {
        event.classList.add(`editableItem`);
        event.addEventListener(`click`, async (event) => {
            event.preventDefault();
            // select data
            const exhibitionID = 1;
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
                const exhibitionID = 1;
                await fetch(`/api/exhibitions/${exhibitionID}`, options);
                bodyNode.removeChild(editWrapper);
            });
            const deleteButton = editWrapper.querySelector(`.adminDeleteButton`);
            deleteButton.addEventListener(`click`, async (event) => {
                event.preventDefault();
                const options = { method: `DELETE` };
                const exhibitionID = 2;
                await fetch(`/api/exhibitions/${exhibitionID}`, options);
                bodyNode.removeChild(editWrapper);
            });
            const closeButton = editWrapper.querySelector(`.templateCloseButton`);
            closeButton.addEventListener(`click`, (event) => {
                event.preventDefault();
                bodyNode.removeChild(editWrapper);
            });
        });
    });
}

const rewardEvents = [...document.querySelectorAll(`.rewardList .painterEvent`)];
if (rewardEvents.length) {
    rewardEvents.forEach((event) => {
        event.classList.add(`editableItem`);
        event.addEventListener(`click`, async (event) => {
            event.preventDefault();
            // select data
            const rewardID = 1;
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
                const rewardID = 1;
                await fetch(`/api/rewards/${rewardID}`, options);
                bodyNode.removeChild(editWrapper);
            });
            const deleteButton = editWrapper.querySelector(`.adminDeleteButton`);
            deleteButton.addEventListener(`click`, async (event) => {
                event.preventDefault();
                const options = { method: `DELETE` };
                const rewardID = 4;
                await fetch(`/api/rewards/${rewardID}`, options);
                bodyNode.removeChild(editWrapper);
            });
            const closeButton = editWrapper.querySelector(`.templateCloseButton`);
            closeButton.addEventListener(`click`, (event) => {
                event.preventDefault();
                bodyNode.removeChild(editWrapper);
            });
        });
    });
}