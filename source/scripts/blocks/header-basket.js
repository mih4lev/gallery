export const checkBasketStorage = () => {
    // need to create check this pictures and update person basket
    const storage = localStorage.getItem(`basket`);
    if (!storage) return false;
    const basketPictures = JSON.parse(storage);
    if (!basketPictures.length) return false;
    const basketCountNode = document.querySelector(`.basketCount`);
    if (!basketCountNode) return false;
    basketCountNode.innerText = basketPictures.length;
    basketCountNode.classList.add(`basketCount--active`);
    basketPictures.forEach((pictureID) => {
        const activeButton = document.querySelector(`button[data-picture-id="${pictureID}"]`);
        if (!activeButton) return false;
        activeButton.classList.add(`cartButton--active`);
        activeButton.setAttribute(`disabled`, `disabled`);
    });
};

const cloneTemplate = (pictureData) => {
    const {
        pictureID, picture, photos: { 0: { photoLink }},
        pictureSizeWidth, pictureSizeHeight, authorID, author,
        picturePrice, picturePriceSale, langPrice, langPriceSale
    } = pictureData;
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const priceClass = (lang === `ru`) ? `price--rub` : `price--euro`;
    const templateNode = document.querySelector(`.basketTemplate`).content.cloneNode(true);
    const wrapper = templateNode.querySelector(`.addedPictures`);
    const picturePhoto = wrapper.querySelector(`.basketPhoto`);
    const pictureTitle = wrapper.querySelector(`.pictureHeader`);
    const pictureWidth = wrapper.querySelector(`.pictureWidth`);
    const pictureHeight = wrapper.querySelector(`.pictureHeight`);
    const pictureAuthor = wrapper.querySelector(`.pictureAuthor`);
    const picturePriceNode = wrapper.querySelector(`.picturePrice--main`);
    const picturePriceOldNode = wrapper.querySelector(`.picturePrice--old`);
    picturePhoto.src = `/photos/pictures/${photoLink}.png`;
    picturePhoto.setAttribute(`alt`, picture);
    pictureTitle.innerText = picture;
    pictureTitle.setAttribute(`href`, `/collection/${pictureID}`);
    pictureWidth.innerText = pictureSizeWidth;
    pictureWidth.classList.add(`metric--${lang}`);
    pictureHeight.innerText = pictureSizeHeight;
    pictureHeight.classList.add(`metric--${lang}`);
    pictureAuthor.innerText = author;
    pictureAuthor.setAttribute(`href`, `/authors/${authorID}`);
    if (!picturePriceSale || picturePriceSale === 0) {
        picturePriceNode.innerText = langPrice;
        picturePriceNode.classList.add(priceClass);
        picturePriceNode.dataset.rub = picturePrice;
        picturePriceOldNode.parentNode.removeChild(picturePriceOldNode);
    } else {
        // main
        picturePriceNode.innerText = langPriceSale;
        picturePriceNode.classList.add(priceClass);
        picturePriceNode.dataset.rub = picturePriceSale;
        // old
        picturePriceOldNode.innerText = langPrice;
        picturePriceOldNode.dataset.rub = picturePrice;
    }
    // button
    const basketButton = wrapper.querySelector(`.basketButton`);
    basketButton.addEventListener(`click`, () => {
        if (document.location.href.indexOf(`basket`) !== -1) return false;
        document.location.href = `/basket`;
    });
    return wrapper;
};

const showBasketPictures = async () => {
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const wrapper = document.querySelector(`.headerBasket`);
    const storage = localStorage.getItem(`basket`);
    if (!storage) return false;
    const basketPictures = JSON.parse(storage);
    const pictureID = basketPictures[basketPictures.length - 1];
    const response = await fetch(`/api/pictures/${pictureID}/lang/${lang}`);
    const result = await response.json();
    if (result.picture) {
        const emptyBasketNode = document.querySelector(`.headerBasket--empty`);
        const alreadyAddedPicture = document.querySelector(`.addedPictures`);
        if (emptyBasketNode) wrapper.removeChild(emptyBasketNode);
        if (alreadyAddedPicture) wrapper.removeChild(alreadyAddedPicture);
        const pictureTemplate = cloneTemplate(result);
        wrapper.appendChild(pictureTemplate);
    }
};

export const headerBasket = () => {
    const wrapper = document.querySelector(`.headerBasket`);
    const link = document.querySelector(`.headerNav--basket`);
    const closeButton = document.querySelector(`.headerBasket--closeButton`);
    const filtersHeader = document.querySelector(`.filtersHeader`);
    const filtersBlock = document.querySelector(`.filters`);
    const showBasket = (zIndex, opacity, visible, isDisabled) => {
        return async (event) => {
            if (filtersBlock && filtersBlock.style.zIndex === `200`) return false;
            event.preventDefault();
            // check for items
            if (!isDisabled) {
                await showBasketPictures();
            }
            wrapper.style.zIndex = zIndex;
            wrapper.style.opacity = opacity;
            wrapper.style.display = visible;
            const windowSize = window.innerWidth;
            if (filtersHeader && windowSize < 768) {
                filtersHeader.style.zIndex = (opacity > 0) ? `-1` : `301`;
                filtersHeader.style.opacity = (opacity > 0) ? `0` : `1`;
            }
            if (!isDisabled) return closeButton.removeAttribute(`disabled`);
            closeButton.setAttribute(`disabled`, `disabled`);
        };
    };
    if (!link) return false;
    link.addEventListener(`click`, showBasket(`100`, `1`, `block`, false));
    closeButton.addEventListener(`click`, showBasket(`-1`, `0`, `none`, true));
};