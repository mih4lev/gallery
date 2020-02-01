import {
    cloneTemplate, collectData, collectDataInner, fillFields,
    hideLoader, hideTemplate, requestMainButton,
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
        const response = await fetch(`/api/pictures`, options);
        const { code, insertID } = await response.json();
        if (code === 200) {
            location.href = `/collection/${insertID}`;
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const editHandler = (editWrapper, pictureId) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const pictureID = Number(pictureId);
        const options = {
            method: `PUT`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectData(editWrapper))
        };
        const response = await fetch(`/api/pictures/${pictureID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.reload();
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const deleteHandler = (pictureID, editWrapper) => {
    return async (event) => {
        event.preventDefault();
        showLoader(editWrapper);
        const options = { method: `DELETE` };
        const response = await fetch(`/api/pictures/${pictureID}`, options);
        const { code } = await response.json();
        if (code === 200) {
            location.href = `/collection`;
        }
        hideTemplate(editWrapper);
        // add errors visible
    };
};

const selectClickHandler = (templateList, multiple = false) => {
    return (event) => {
        event.preventDefault();
        const { target: selectLink } = event;
        if (!multiple) {
            const selectLinks = [...templateList.querySelectorAll(`.selectLink`)];
            selectLinks.forEach((link) => { link.classList.remove(`chosenLink`) });
        }
        const isActive = selectLink.classList.contains(`chosenLink`);
        const method = (isActive) ? `remove` : `add`;
        selectLink.classList[method](`chosenLink`);
    };
};

const requestAuthors = async (activeAuthorID = false) => {
    const response = await fetch(`/api/authors`);
    const authors = await response.json();
    const templateList = selectTemplate(`.pictureSelect`, `.templateList`);
    const templateItem = templateList.querySelector(`.templateItem`).cloneNode(true);
    templateList.innerHTML = ``;
    authors.forEach((author) => {
        const { authorID, authorRU } = author;
        const templateClone = templateItem.cloneNode(true);
        const selectLink = templateClone.querySelector(`.selectLink`);
        selectLink.innerText = authorRU;
        selectLink.dataset.value = authorID;
        selectLink.dataset.field = `authorID`;
        if (activeAuthorID === authorID) selectLink.classList.add(`chosenLink`);
        selectLink.addEventListener(`click`, selectClickHandler(templateList));
        templateList.appendChild(templateClone);
    });
    // add create category button
    return templateList;
};

const closeAddGenreForm = (createButton, genreForm) => {
    return (event) => {
        event.preventDefault();
        createButton.removeChild(genreForm);
    };
};

const createGenre = (createButton, genreForm) => {
    return async (event) => {
        event.preventDefault();
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectDataInner(genreForm))
        };
        const response = await fetch(`/api/genres`, options);
        const { code } = await response.json();
        if (code === 200) {
            //
            const editWrapper = genreForm.closest(`.editWrapper`);
            const templateSelect = editWrapper.querySelector(`.genreSelect`);
            templateSelect.innerHTML = ``;
            templateSelect.appendChild(await requestGenres());
            return createButton.removeChild(genreForm);
        }
    };
};

const showGenreForm = (createButton) => {
    return async (event) => {
        event.preventDefault();
        const genreForm = selectTemplate(`.createGenre`, `.subForm`);
        const closeButton = genreForm.querySelector(`.closeSubFormButton`);
        closeButton.addEventListener(`click`, closeAddGenreForm(createButton, genreForm));
        const submitButton = genreForm.querySelector(`.subFormButton`);
        submitButton.addEventListener(`click`, createGenre(createButton, genreForm));
        createButton.appendChild(genreForm);
    };
};

const requestGenres = async (genresID = false) => {
    const response = await fetch(`/api/genres`);
    const genres = await response.json();
    const templateList = selectTemplate(`.pictureSelect`, `.templateList`);
    const templateItem = templateList.querySelector(`.templateItem`).cloneNode(true);
    templateList.innerHTML = ``;
    genres.forEach((genre) => {
        const { genreID, genreRU } = genre;
        const templateClone = templateItem.cloneNode(true);
        const selectLink = templateClone.querySelector(`.selectLink`);
        selectLink.innerText = genreRU;
        selectLink.dataset.value = genreID;
        selectLink.dataset.field = `genresID`;
        if (genresID) {
            genresID.forEach((activeGenreID) => {
                if (activeGenreID === genreID) selectLink.classList.add(`chosenLink`);
            });
        }
        selectLink.addEventListener(`click`, selectClickHandler(templateList, true));
        templateList.appendChild(templateClone);
    });
    // add create category button
    const createButton = templateItem.cloneNode(true);
    const selectLink = createButton.querySelector(`.selectLink`);
    selectLink.classList.add(`createSubLink`);
    selectLink.innerText = `Создать`;
    selectLink.addEventListener(`click`, showGenreForm(createButton));
    templateList.appendChild(createButton);
    return templateList;
};

const closeAddTechniqueForm = (createButton, techniqueForm) => {
    return (event) => {
        event.preventDefault();
        createButton.removeChild(techniqueForm);
    };
};

const createTechnique = (createButton, techniqueForm) => {
    return async (event) => {
        event.preventDefault();
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectDataInner(techniqueForm))
        };
        const response = await fetch(`/api/techniques`, options);
        const { code } = await response.json();
        if (code === 200) {
            const editWrapper = techniqueForm.closest(`.editWrapper`);
            const templateSelect = editWrapper.querySelector(`.techniqueSelect`);
            templateSelect.innerHTML = ``;
            templateSelect.appendChild(await requestTechniques());
            return createButton.removeChild(techniqueForm);
        }
    };
};

const showTechniqueForm = (createButton) => {
    return async (event) => {
        event.preventDefault();
        const techniqueForm = selectTemplate(`.createTechnique`, `.subForm`);
        const closeButton = techniqueForm.querySelector(`.closeSubFormButton`);
        closeButton.addEventListener(`click`, closeAddTechniqueForm(createButton, techniqueForm));
        const submitButton = techniqueForm.querySelector(`.subFormButton`);
        submitButton.addEventListener(`click`, createTechnique(createButton, techniqueForm));
        createButton.appendChild(techniqueForm);
    };
};

const requestTechniques = async (techniquesID = false) => {
    const response = await fetch(`/api/techniques`);
    const techniques = await response.json();
    const templateList = selectTemplate(`.pictureSelect`, `.templateList`);
    const templateItem = templateList.querySelector(`.templateItem`).cloneNode(true);
    templateList.innerHTML = ``;
    techniques.forEach((technique) => {
        const { techniqueID, techniqueRU } = technique;
        const templateClone = templateItem.cloneNode(true);
        const selectLink = templateClone.querySelector(`.selectLink`);
        selectLink.innerText = techniqueRU;
        selectLink.dataset.value = techniqueID;
        selectLink.dataset.field = `techniquesID`;
        if (techniquesID) {
            techniquesID.forEach((activeTechniqueID) => {
                if (activeTechniqueID === techniqueID) selectLink.classList.add(`chosenLink`);
            });
        }
        selectLink.addEventListener(`click`, selectClickHandler(templateList, true));
        templateList.appendChild(templateClone);
    });
    // add create category button
    const createButton = templateItem.cloneNode(true);
    const selectLink = createButton.querySelector(`.selectLink`);
    selectLink.classList.add(`createSubLink`);
    selectLink.innerText = `Создать`;
    selectLink.addEventListener(`click`, showTechniqueForm(createButton));
    templateList.appendChild(createButton);
    return templateList;
};

const createColor = (createButton, colorForm) => {
    return async (event) => {
        event.preventDefault();
        const options = {
            method: `POST`,
            headers: {
                'Content-Type': `application/json;charset=utf-8`
            },
            body: JSON.stringify(collectDataInner(colorForm))
        };
        const response = await fetch(`/api/colors`, options);
        const { code } = await response.json();
        if (code === 200) {
            const editWrapper = colorForm.closest(`.editWrapper`);
            const templateSelect = editWrapper.querySelector(`.colorSelect`);
            templateSelect.innerHTML = ``;
            templateSelect.appendChild(await requestColors());
            return createButton.removeChild(colorForm);
        }
    };
};

const closeAddColorForm = (createButton, colorForm) => {
    return (event) => {
        event.preventDefault();
        createButton.removeChild(colorForm);
    };
};

const showColorForm = (createButton) => {
    return async (event) => {
        event.preventDefault();
        const colorForm = selectTemplate(`.createColor`, `.subForm`);
        const closeButton = colorForm.querySelector(`.closeSubFormButton`);
        closeButton.addEventListener(`click`, closeAddColorForm(createButton, colorForm));
        const submitButton = colorForm.querySelector(`.subFormButton`);
        submitButton.addEventListener(`click`, createColor(createButton, colorForm));
        createButton.appendChild(colorForm);
    };
};

const requestColors = async (colorsID = false) => {
    const response = await fetch(`/api/colors`);
    const colors = await response.json();
    const templateList = selectTemplate(`.pictureSelect`, `.templateList`);
    const templateItem = templateList.querySelector(`.templateItem`).cloneNode(true);
    templateList.innerHTML = ``;
    colors.forEach((color) => {
        const { colorID, colorRU, colorName, colorHEX } = color;
        const templateClone = templateItem.cloneNode(true);
        const selectLink = templateClone.querySelector(`.selectLink`);
        selectLink.classList.add(`colorLink`);
        selectLink.style.backgroundColor = colorHEX;
        selectLink.innerText = colorName;
        selectLink.dataset.value = colorID;
        selectLink.dataset.field = `colorsID`;
        if (colorsID) {
            colorsID.forEach((activeColorID) => {
                if (activeColorID === colorID) selectLink.classList.add(`chosenLink`);
            });
        }
        selectLink.addEventListener(`click`, selectClickHandler(templateList, true));
        templateList.appendChild(templateClone);
    });
    // add create category button
    const createButton = templateItem.cloneNode(true);
    const selectLink = createButton.querySelector(`.selectLink`);
    selectLink.classList.add(`createSubLink`);
    selectLink.innerText = `Создать`;
    selectLink.addEventListener(`click`, showColorForm(createButton));
    templateList.appendChild(createButton);
    return templateList;
};

const selectData = async (pictureId) => {
    const pictureID = Number(pictureId);
    const response = await fetch(`/api/pictures/${pictureID}`);
    return await response.json();
};

const requestOrientation = async (activeOrientation = false) => {
    const templateList = selectTemplate(`.pictureOrientation`, `.templateList`);
    const selectLinks = [...templateList.querySelectorAll(`.selectLink`)];
    selectLinks.forEach((selectLink) => {
        const { dataset: { value: orientation }} = selectLink;
        if (activeOrientation === orientation) selectLink.classList.add(`chosenLink`);
        selectLink.addEventListener(`click`, selectClickHandler(templateList));
    });
    return templateList;
};

export const addPicture = async (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.pictureTemplate`);
    // orientation select
    const orientationSelect = editWrapper.querySelector(`.orientationSelect`);
    orientationSelect.appendChild(await requestOrientation());
    // authors select
    const authorSelect = editWrapper.querySelector(`.authorSelect`);
    authorSelect.appendChild(await requestAuthors());
    // genres select
    const genreSelect = editWrapper.querySelector(`.genreSelect`);
    genreSelect.appendChild(await requestGenres());
    // techniques select
    const techniqueSelect = editWrapper.querySelector(`.techniqueSelect`);
    techniqueSelect.appendChild(await requestTechniques());
    // colors select
    const colorSelect = editWrapper.querySelector(`.colorSelect`);
    colorSelect.appendChild(await requestColors());
    //
    hideLoader(editWrapper);
    // button
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, addHandler(editWrapper));
};

export const deletePicture = async (event) => {
    event.preventDefault();
    const editWrapper = cloneTemplate(`.pictureDeleteTemplate`);
    const pictureID = Number(event.target.dataset.pictureId);
    const mainButton = requestMainButton(editWrapper);
    mainButton.addEventListener(`click`, deleteHandler(pictureID, editWrapper));
    hideLoader(editWrapper);
};

export const editPicture = async (event) => {
    event.preventDefault();
    const { target: { dataset: { pictureId }}} = event;
    const editWrapper = cloneTemplate(`.pictureTemplate`);
    const data = await selectData(pictureId);
    fillFields(data, editWrapper);
    // orientation select
    const orientationSelect = editWrapper.querySelector(`.orientationSelect`);
    const { pictureOrientation } = data;
    orientationSelect.appendChild(await requestOrientation(pictureOrientation));
    // authors select
    const authorSelect = editWrapper.querySelector(`.authorSelect`);
    const { author: { authorID }} = data;
    authorSelect.appendChild(await requestAuthors(authorID));
    // genres select
    const genreSelect = editWrapper.querySelector(`.genreSelect`);
    const genresID = data.genres.map(({ genreID }) => genreID);
    genreSelect.appendChild(await requestGenres(genresID));
    // techniques select
    const techniqueSelect = editWrapper.querySelector(`.techniqueSelect`);
    const techniquesID = data.techniques.map(({ techniqueID }) => techniqueID);
    techniqueSelect.appendChild(await requestTechniques(techniquesID));
    // colors select
    const colorsSelect = editWrapper.querySelector(`.colorSelect`);
    const colorID = data.colors.map(({ colorID }) => colorID);
    colorsSelect.appendChild(await requestColors(colorID));
    // button
    const mainButton = requestMainButton(editWrapper, `Обновить`);
    mainButton.addEventListener(`click`, editHandler(editWrapper, pictureId));
    hideLoader(editWrapper);
};