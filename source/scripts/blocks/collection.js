import Masonry from "masonry-layout";
import { currency } from "../utils";
import { checkBasketStorage } from "./header-basket";
import { cartButtons } from "./basket";
const imagesLoaded = require('imagesloaded');

export const translatePicture = () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        const pictureHeader = document.querySelector(`.pictureHeaderID`);
        if (!pictureHeader) return false;
        const { dataset: { pictureId }} = pictureHeader;
        const pictureID = Number(pictureId);
        const response = await fetch(`/api/pictures/${pictureID}/lang/${lang}`);
        const { picture, pictureAbout, author, genres, techniques } = await response.json();
        pictureHeader.innerText = picture;
        document.querySelector(`.breadcrumbLink--active`).innerText = picture;
        document.querySelector(`.pictureAuthorData`).innerText = author;
        document.querySelector(`.pictureText`).innerText = pictureAbout;
        // genres
        const genreList = [...document.querySelectorAll(`.genreTitle`)];
        genres.forEach(({ genre }, index) => {
            genreList[index].innerText = genre;
        });
        // genres
        const techniqueList = [...document.querySelectorAll(`.techniqueTitle`)];
        techniques.forEach(({ technique }, index) => {
            techniqueList[index].innerText = technique;
        });
    });
};

export const translatePictureList = () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        const filtersHeader = document.querySelector(`.filtersHeader`);
        if (!filtersHeader) return false;
        location.reload();
    });
};

const visiblePicturesCount = () => {
    return document.querySelectorAll(`.pictureList .picture`).length;
};

const checkButtonVisible = (picturesCount) => {
    const showMoreButton = document.querySelector(`.picturesButton`);
    if (picturesCount > visiblePicturesCount()) {
        return showMoreButton.style.display = `block`;
    }
    return showMoreButton.style.display = `none`;
};

const cloneTemplate = (picture) => {
    const {
        picture: pictureTitle, pictureID, author, authorID,
        pictureSizeWidth, pictureSizeHeight, langPrice, picturePrice,
        photos
    } = picture;
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const photoLink = (photos[0]) ? photos[0].photoLink : ``;
    const sourcePicture = document.querySelector(`.clonePictureTemplate`).content;
    const pictureTemplate = sourcePicture.cloneNode(true);
    const pictureHeader = pictureTemplate.querySelector(`.pictureHeader`);
    const pictureAuthor = pictureTemplate.querySelector(`.pictureAuthor`);
    const picturePhoto = pictureTemplate.querySelector(`.picturePhoto`);
    const picturePhotoLink = pictureTemplate.querySelector(`.picturePhotoWrapper`);
    const pictureWidth = pictureTemplate.querySelector(`.pictureWidth`);
    const pictureHeight = pictureTemplate.querySelector(`.pictureHeight`);
    const mainPrice = pictureTemplate.querySelector(`.picturePrice--main`);
    const cartButton = pictureTemplate.querySelector(`.cartButton`);
    const priceClass = (lang === `ru`) ? `price--rub` : `price--euro`;
    pictureHeader.innerText = pictureTitle;
    pictureHeader.setAttribute(`href`, `/collection/${pictureID}`);
    pictureAuthor.innerText = author;
    pictureAuthor.setAttribute(`href`, `/authors/${authorID}`);
    if (photoLink) {
        picturePhoto.src = `/photos/pictures/${photoLink}.png`;
        picturePhoto.setAttribute(`alt`, pictureTitle);
    } else {
        const defaultPhoto = document.createElement(`div`);
        defaultPhoto.classList.add(`defaultPhoto`);
        picturePhotoLink.removeChild(picturePhoto);
        picturePhotoLink.appendChild(defaultPhoto);
    }
    picturePhotoLink.setAttribute(`href`, `/collection/${pictureID}`);
    pictureWidth.innerText = pictureSizeWidth;
    pictureHeight.innerText = pictureSizeHeight;
    mainPrice.innerText = langPrice;
    mainPrice.dataset.rub = picturePrice;
    mainPrice.classList.add(priceClass);
    cartButton.dataset.pictureId = pictureID;
    return pictureTemplate;
};

const hideLoader = () => {
    const loader = document.querySelector(`.collectionLoader`);
    loader.classList.remove(`collectionLoader--visible`);
};

const showLoader = () => {
    const loader = document.querySelector(`.collectionLoader`);
    loader.classList.add(`collectionLoader--visible`);
};

const filterPictures = (pictures, filterData) => {
    showLoader();
    const filteredPictures = pictures.filter((picture) => {
        const {
            picturePrice, pictureSizeWidth, pictureSizeHeight,
            pictureOrientation, authorID, colors,
            genres: pictureGenres, techniques: pictureTechniques
        } = picture;
        const {
            minPrice, maxPrice, minWidth, maxWidth,
            minHeight, maxHeight, orientation, authors,
            color, genres, techniques
        } = filterData;
        // price
        if (picturePrice < minPrice || picturePrice > maxPrice) return false;
        // width
        if (pictureSizeWidth < minWidth || pictureSizeWidth > maxWidth) return false;
        // height
        if (pictureSizeHeight < minHeight || pictureSizeHeight > maxHeight) return false;
        // orientation
        if (!orientation.includes(pictureOrientation)) return false;
        // authors
        if (!authors.includes(String(authorID))) return false;
        // color
        const colorsArray = colors.map(({ colorID }) => String(colorID));
        const hasColor = !!colorsArray.filter((pictureColor) => {
            return color.includes(pictureColor)
        }).length;
        if (!hasColor) return false;
        // genre
        const genreArray = pictureGenres.map(({ genreID }) => String(genreID));
        const hasGenre = !!genreArray.filter((pictureGenre) => {
            return genres.includes(pictureGenre)
        }).length;
        if (!hasGenre) return false;
        // technique
        const techniqueArray = pictureTechniques.map(({ techniqueID }) => String(techniqueID));
        const hasTechnique = !!techniqueArray.filter((pictureTechnique) => {
            return techniques.includes(pictureTechnique)
        }).length;
        if (!hasTechnique) return false;
        // return true if all checks success
        return true;
    });
    const picturesCount = filteredPictures.length;
    const pictureList = document.querySelector(`.pictureList`);
    pictureList.innerHTML = ``;
    filteredPictures.forEach((picture, index) => {
        const pictureNode = cloneTemplate(picture);
        pictureList.appendChild(pictureNode);
        checkButtonVisible(picturesCount);
    });
    imagesLoaded( pictureList, async () => {
        new Masonry( pictureList, {
            itemSelector: `.picture`
        });
        checkBasketStorage();
        await cartButtons();
        setTimeout(() => {
            hideLoader();
        }, 300);
    });
};

let timeoutID;
const changeFilters = (pictures) => {
    return async (mutationsList) => {
        const lang = document.querySelector(`html`).getAttribute(`lang`);
        const filterList = document.querySelector(`.filters`);
        const minPriceNode = filterList.querySelector(`.labelMin.price`);
        const maxPriceNode = filterList.querySelector(`.labelMax.price`);
        const minWidthNode = filterList.querySelector(`.labelMin.metricWidth`);
        const maxWidthNode = filterList.querySelector(`.labelMax.metricWidth`);
        const minHeightNode = filterList.querySelector(`.labelMin.metricHeight`);
        const maxHeightNode = filterList.querySelector(`.labelMax.metricHeight`);
        const orientations = filterList.querySelector(`.orientationWrapper`);
        const colors = filterList.querySelector(`.colorsWrapper`);
        const genreList = filterList.querySelector(`.chosenList.genreList`);
        const genreDropdown = filterList.querySelector(`.dropdownList.genreList`);
        const techniqueList = filterList.querySelector(`.chosenList.techniqueList`);
        const techniqueDropdown = filterList.querySelector(`.dropdownList.techniqueList`);
        const authorList = filterList.querySelector(`.chosenList.authorList`);
        const authorDropdown = filterList.querySelector(`.dropdownList.authorList`);
        for (let mutation of mutationsList) {
            const { target } = mutation;
            if (
                target.classList.contains(`range`) ||
                target.classList.contains(`rangeMin`) ||
                target.classList.contains(`rangeMax`) ||
                target.classList.contains(`dropdown`) ||
                target.classList.contains(`filterLabel`) ||
                target.classList.contains(`filters`)
            ) return false;
            //
            // orientation
            let orientation = [];
            const dropOrientation = ({ dataset: { select }}) => orientation.push(select);
            const orientationElements = [...orientations.querySelectorAll(`.orientation`)];
            const orientationActive = [...orientations.querySelectorAll(`.orientation--active`)];
            (!orientationActive.length) ?
                orientationElements.forEach(dropOrientation) :
                orientationActive.forEach(dropOrientation);
            // colors
            let color = [];
            const dropColor = ({ dataset: { select }}) => color.push(select);
            const colorElements = [...colors.querySelectorAll(`.color`)];
            const colorActive = [...colors.querySelectorAll(`.color--active`)];
            (!colorActive.length) ?
                colorElements.forEach(dropColor) :
                colorActive.forEach(dropColor);
            // genres
            let genres = [];
            const dropGenre = ({ dataset: { select }}) => genres.push(select);
            const genreElements = [...genreDropdown.querySelectorAll(`.dropdownItem`)];
            const genreActive = [...genreList.querySelectorAll(`.chosenItem`)];
            (!genreActive.length) ?
                genreElements.forEach(dropGenre) :
                genreActive.forEach(dropGenre);
            // techniques
            let techniques = [];
            const dropTechnique = ({ dataset: { select }}) => techniques.push(select);
            const techniqueElements = [...techniqueDropdown.querySelectorAll(`.dropdownItem`)];
            const techniqueActive = [...techniqueList.querySelectorAll(`.chosenItem`)];
            (!techniqueActive.length) ?
                techniqueElements.forEach(dropTechnique) :
                techniqueActive.forEach(dropTechnique);
            // authors
            let authors = [];
            const dropAuthor = ({ dataset: { select }}) => authors.push(select);
            const authorsElements = [...authorDropdown.querySelectorAll(`.dropdownItem`)];
            const authorsActive = [...authorList.querySelectorAll(`.chosenItem`)];
            (!authorsActive.length) ?
                authorsElements.forEach(dropAuthor) :
                authorsActive.forEach(dropAuthor);
            // result
            const minPrice = Number(minPriceNode.dataset.current || minPriceNode.dataset.rub);
            const maxPrice = Number(maxPriceNode.dataset.current || maxPriceNode.dataset.rub);
            const rate = await currency();
            const filterData = {
                minPrice: (lang === `ru`) ? minPrice : minPrice * rate,
                maxPrice: (lang === `ru`) ? maxPrice : maxPrice * rate,
                minWidth: Number(minWidthNode.innerText),
                maxWidth: Number(maxWidthNode.innerText),
                minHeight: Number(minHeightNode.innerText),
                maxHeight: Number(maxHeightNode.innerText),
                orientation, color, genres, techniques, authors
            };
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => filterPictures(pictures, filterData), 300);
        }
    };
};

export const collectionFilters = async () => {
    const filtersNode = document.querySelector(`.filters`);
    const pictureList = document.querySelector(`.pictureList`);
    if (!filtersNode || !pictureList) return false;
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const collectionResponse = await fetch(`/api/pictures/lang/${lang}`);
    const pictures = await collectionResponse.json();
    const picturesCount = pictures.length;
    const showMoreButton = document.querySelector(`.picturesButton`);
    checkButtonVisible(picturesCount);
    showMoreButton.addEventListener(`click`, () => {
        pictures.forEach((picture, index) => {
            if (index < visiblePicturesCount()) return false;
            if (index > visiblePicturesCount() + 10) return false;
            const clonedPicture = cloneTemplate(picture);
            pictureList.appendChild(clonedPicture);
            checkButtonVisible(picturesCount);
        });
        imagesLoaded( pictureList, function() {
            new Masonry( pictureList, {
                itemSelector: `.picture`
            });
        });
    });
    // filters
    const filterList = document.querySelector(`.filters`);
    const config = { attributes: true, childList: true, subtree: true, characterData: true };
    const observer = new MutationObserver(changeFilters(pictures));
    observer.observe(filterList, config);
};

export const setDesktopLinks = () => {
    const desktopLinks = document.querySelectorAll(`.collectionPhoto`);
    desktopLinks.forEach((link) => {
        link.addEventListener(`click`, () => {
            document.location.href = "/collection";
        });
    });
};

export const setPicturesLayout = () => {
    // set pictures layout
    const pictureList = document.querySelector(`.pictureList`);
    if (!pictureList) return false;
    imagesLoaded( pictureList, function() {
        new Masonry( pictureList, {
            itemSelector: `.picture`
        });
    });
    // filters hide on mobile && tabletMini
    const filtersHeader = document.querySelector(`.filtersHeader`);
    if (!filtersHeader) return false;
    filtersHeader.addEventListener(`click`, () => {
        const windowSize = window.innerWidth;
        if (windowSize >= 768) return false;
        const filters = document.querySelector(`.filters`);
        const isVisible = (filters.style.opacity === `1`);
        filters.style.zIndex = (isVisible) ? `-200` : `200`;
        filters.style.opacity = (isVisible) ? `0` : `1`;
        const method = (isVisible) ? `remove` : `add`;
        filtersHeader.classList[method](`filtersHeader--active`);
    });
    // format rub function
    const format = (value) => {
        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    };
    // hide all dropdown menus
    const dropdownWrappers = [...document.querySelectorAll(`.dropdown`)];
    const hideAllDropdownMenu = () => {
        dropdownWrappers.forEach((wrapper) => {
            const parentElement = wrapper.closest(`.filter`);
            const label = parentElement.querySelector(`.filterLabel`);
            label.classList.remove(`filterLabel--active`);
            wrapper.style.opacity = `0`;
            wrapper.style.zIndex = `-1`;
        });
    };
    // show dropdown menu
    const dropdownElements = [...document.querySelectorAll(`.filterLabel--dropdown`)];
    dropdownElements.forEach((element) => {
        element.addEventListener(`click`, () => {
            const dropdownMenu = element.closest(`.filter`).querySelector(`.dropdown`);
            const isActive = (dropdownMenu.style.opacity && dropdownMenu.style.opacity === `1`);
            const method = (isActive) ? `remove` : `add`;
            if (!isActive) hideAllDropdownMenu();
            element.classList[method](`filterLabel--active`);
            dropdownMenu.style.opacity = (isActive) ? `0` : `1`;
            dropdownMenu.style.zIndex = (isActive) ? `-1` : `10`;
        });
    });
    // create vertical scroll
    const dropdownLists = [...document.querySelectorAll(`.dropdownList`)];
    dropdownLists.forEach((list) => {
        const maxElements = 6;
        const listHeight = list.offsetHeight;
        const listElements = list.children.length;
        const step = list.children[0].offsetHeight;
        const maxListHeight = step * maxElements;
        // init right scroll line
        const maxScrollViewport = maxListHeight + 22;
        const scrollHeight = maxScrollViewport * (maxElements / listElements);
        const scrollStep = (maxScrollViewport) / (listElements);
        const scrollParent = list.closest(`.dropdown`);
        const scrollNode = scrollParent.querySelector(`.dropdownScroll`);
        scrollNode.style.height = `${scrollHeight}px`;
        if (listElements <= maxElements) {
            scrollNode.style.display = `none`;
        }
        // scroll slide function
        const slide = (direction) => {
            const scrolled = Number(list.dataset.scroll) || 0;
            const newScroll = (direction) ? scrolled - step : scrolled + step;
            const isMinimum = (newScroll >= 0);
            const isMaximum = (list.dataset.scroll) ?
                (maxListHeight + (list.dataset.scroll * -1) === listHeight) :
                (maxListHeight === listHeight);
            if (listHeight < maxListHeight) return false;
            const scroll = (isMinimum) ? 0 : (isMaximum) ? newScroll + step : newScroll;
            list.dataset.scroll = `${scroll}`;
            list.style.marginTop = (isMinimum) ? `0` : `${scroll}px`;
            // right scroll line
            const scrollOffset = String(scrollStep);
            const scrolledNodes = (scroll * -1) / step;
            scrollNode.style.top = (isMinimum) ? `0` : `${scrollOffset * scrolledNodes}px`;
        };
        // add wheel listener at list
        list.addEventListener(`wheel`, (event) => {
            event.preventDefault();
            const direction = (event.deltaY > 0);
            slide(direction);
        });
        // add touch listener at list
        let touchStartY = 0;
        let touchEndY = 0;
        list.addEventListener(`touchstart`, (event) => {
            event.preventDefault();
            event.stopPropagation();
            touchStartY = event.changedTouches[0].clientY;
        }, false);
        list.addEventListener(`touchend`, (event) => {
            event.preventDefault();
            event.stopPropagation();
            touchEndY = event.changedTouches[0].clientY;
            if (touchEndY - touchStartY < 10 && touchEndY - touchStartY > -10) {
                return event.target.click();
            }
            const direction = (touchEndY - touchStartY < 0);
            slide(direction);
        }, false);
    });
    // add dropdown items to chosen list
    const dropdownLinks = [...document.querySelectorAll(`.dropdownItem`)];
    dropdownLinks.forEach((itemNode) => {
        const linkNode = itemNode.querySelector(`.dropdownLink`);
        const filterParentNode = itemNode.closest(`.filter`);
        const chosenListNode = filterParentNode.querySelector(`.chosenList`);
        const removeItem = () => {
            linkNode.classList.remove(`dropdownLink--active`);
            const chosenID = itemNode.dataset.select;
            const selector = `.chosenItem[data-select="${chosenID}"]`;
            const chosenItemNode = chosenListNode.querySelector(selector);
            chosenListNode.removeChild(chosenItemNode);
        };
        const addItem = () => {
            const cloneNode = itemNode.cloneNode(true);
            const clonedLink = cloneNode.querySelector(`.dropdownLink`);
            cloneNode.classList.replace(`dropdownItem`, `chosenItem`);
            clonedLink.classList.replace(`dropdownLink`, `chosenLink`);
            linkNode.classList.add(`dropdownLink--active`);
            chosenListNode.appendChild(cloneNode);
            cloneNode.addEventListener(`click`, () => {
                removeItem();
            });
        };
        const clickHandler = () => {
            const isChosen = linkNode.classList.contains(`dropdownLink--active`);
            // start filter
            return (isChosen) ? removeItem() : addItem();
        };
        linkNode.addEventListener(`click`, clickHandler);
    });
    // get coordinates of element
    function coors(element) {
        let top = 0;
        let left = 0;
        while(element) {
            top = top + parseFloat(element.offsetTop);
            left = left + parseFloat(element.offsetLeft);
            element = element.offsetParent;
        }
        return { top: Math.round(top), left: Math.round(left) };
    }
    // range blocks
    const rangeWrappers = [...document.querySelectorAll(`.rangeWrapper`)];
    rangeWrappers.forEach((rangeWrapper) => {
        const requestRange = () => {
            const minValueNode = rangeWrapper.querySelector(`.labelMin`);
            const maxValueNode = rangeWrapper.querySelector(`.labelMax`);
            if (!minValueNode.dataset.value) {
                minValueNode.dataset.value = minValueNode.dataset.rub || minValueNode.dataset.default;
            }
            if (!maxValueNode.dataset.value) {
                maxValueNode.dataset.value = maxValueNode.dataset.rub || maxValueNode.dataset.default;
            }
            const minValue = Number(minValueNode.dataset.value);
            const maxValue = Number(maxValueNode.dataset.value);
            const valueRange = maxValue - minValue;
            const step =
                (valueRange / 1000 > 100) ? 1000 :
                    (valueRange / 500 > 100) ? 500 :
                        (valueRange / 100 > 100) ? 100 :
                            (valueRange / 50 > 500) ? 50 : 10;
            return {
                minValueNode, minValue,
                maxValueNode, maxValue,
                valueRange, step
            }
        };
        const rangeLine = rangeWrapper.querySelector(`.range`);
        const maxRange = rangeLine.offsetWidth;
        const rangeMinButton = rangeWrapper.querySelector(`.rangeMin`);
        const { left: minButtonOffset } = coors(rangeMinButton);
        const rangeMaxButton = rangeWrapper.querySelector(`.rangeMax`);
        const { left: maxButtonOffset } = coors(rangeMaxButton);
        let buttonFinishCoors = 0;
        const leftMoveHandler = (event) => {
            const { minValueNode, minValue, valueRange, step } = requestRange();
            buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
            const range = buttonFinishCoors - minButtonOffset;
            const isMinimal = (buttonFinishCoors - minButtonOffset < 0);
            const isMaximum = (maxRange < range);
            const { left: maxButtonOffset } = coors(rangeMaxButton);
            const isInvalidOffset = (buttonFinishCoors - maxButtonOffset > 0);
            const rangeSize =
                (isInvalidOffset) ? (maxButtonOffset - minButtonOffset) :
                    (isMaximum) ? maxRange :
                        (isMinimal) ? 0 : range;
            const value = (rangeSize / maxRange) * valueRange;
            const roundValue = Math.round(Math.round(value) / step) * step;
            const isDefault = (minValueNode.classList.contains(`price--rub`));
            const textValue = roundValue + minValue;
            if (minValueNode.dataset.rub) {
                minValueNode.dataset.current = String(textValue);
            }
            const formValue = (minValueNode.dataset.rub) ? textValue.toFixed(2) : textValue;
            minValueNode.innerText = (isDefault) ? format(textValue) : formValue;
            rangeMinButton.style[`left`] = `${rangeSize}px`;
            rangeLine.style[`left`] = `${rangeSize}px`;
        };
        rangeMinButton.addEventListener(`mousedown`, () => {
            document.addEventListener(`mousemove`, leftMoveHandler);
            document.addEventListener(`mouseup`, (event) => {
                buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
                document.removeEventListener(`mousemove`, leftMoveHandler);
            });
        });
        rangeMinButton.addEventListener(`touchstart`, (event) => {
            // event.preventDefault();
            document.addEventListener(`touchmove`, leftMoveHandler);
            document.addEventListener(`touchend`, (event) => {
                // event.preventDefault();
                buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
                document.removeEventListener(`touchmove`, leftMoveHandler);
            });
        });
        const rightMoveHandler = (event) => {
            // event.preventDefault();
            const { maxValueNode, maxValue, valueRange, step } = requestRange();
            buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
            const range = maxButtonOffset - buttonFinishCoors;
            const isMinimal = (buttonFinishCoors - maxButtonOffset > 0);
            const isMaximum = (maxRange < range);
            const { left: minButtonOffset } = coors(rangeMinButton);
            const isInvalidOffset = (buttonFinishCoors - minButtonOffset < 0);
            const rangeSize =
                (isInvalidOffset) ? (maxButtonOffset - minButtonOffset) :
                    (isMaximum) ? maxRange :
                        (isMinimal) ? 0 : range;
            const value = (rangeSize / maxRange) * valueRange;
            const roundValue = Math.round(Math.round(value) / step) * step;
            const isDefault = (maxValueNode.classList.contains(`price--rub`));
            const textValue = maxValue - roundValue;
            if (maxValueNode.dataset.rub) {
                maxValueNode.dataset.current = String(textValue);
            }
            const formValue = (maxValueNode.dataset.rub) ? textValue.toFixed(2) : textValue;
            maxValueNode.innerText = (isDefault) ? format(textValue) : formValue;
            rangeMaxButton.style[`right`] = `${rangeSize}px`;
            rangeLine.style[`right`] = `${rangeSize}px`;
        };
        rangeMaxButton.addEventListener(`mousedown`, (event) => {
            event.preventDefault();
            document.addEventListener(`mousemove`, rightMoveHandler);
            document.addEventListener(`mouseup`, (event) => {
                event.preventDefault();
                buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
                document.removeEventListener(`mousemove`, rightMoveHandler);
            });
        });
        rangeMaxButton.addEventListener(`touchstart`, (event) => {
            // event.preventDefault();
            document.addEventListener(`touchmove`, rightMoveHandler);
            document.addEventListener(`touchend`, (event) => {
                // event.preventDefault();
                buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
                document.removeEventListener(`touchmove`, rightMoveHandler);
            });
        });
    });
    // trigger to custom event 'languageChange'
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        // change filters currency
        const minNode = document.querySelector(`.labelMin[data-rub]`);
        const maxNode = document.querySelector(`.labelMax[data-rub]`);
        if (!minNode || !maxNode) return false;
        const rate = await currency();
        const isDefault = (lang === `ru`);
        const { dataset: { rub: minDefaultRub }} = minNode;
        const { dataset: { rub: maxDefaultRub }} = maxNode;
        const minDefaultValueEuro = Math.round((minDefaultRub / rate) * 100) / 100;
        const maxDefaultValueEuro = Math.round((maxDefaultRub / rate) * 100) / 100;
        const minRoundValueEuro = Math.floor(minDefaultValueEuro / 100) * 100;
        const maxRoundValueEuro = Math.ceil(maxDefaultValueEuro / 100) * 100;
        const minValue = (isDefault) ? minDefaultRub : minRoundValueEuro;
        const maxValue = (isDefault) ? maxDefaultRub : maxRoundValueEuro;
        minNode.dataset.value = minValue;
        maxNode.dataset.value = maxValue;
        minNode.innerText = (isDefault) ? format(minValue) : minValue;
        maxNode.innerText = (isDefault) ? format(maxValue) : maxValue;
        // change current values
        const currentValueNodes = [...document.querySelectorAll(`[data-current]`)];
        currentValueNodes.forEach((node) => {
            const { dataset: { current: currentValue }} = node;
            const preValue = (isDefault) ? currentValue * rate : currentValue / rate;
            const step = (isDefault) ? 100 : 10;
            const exchangeValue = Math.round((preValue) * step) / step;
            const roundValue = Math.round(exchangeValue / step) * step;
            node.dataset.current = String(roundValue);
            node.innerText = (isDefault) ? format(exchangeValue) : exchangeValue;
        });
    });
    // orientation choose
    const orientationIcons = [...document.querySelectorAll(`.orientation`)];
    orientationIcons.forEach((icon) => {
        icon.addEventListener(`click`, () => {
            const isChosen = icon.classList.contains(`orientation--active`);
            const method = (isChosen) ? `remove` : `add`;
            icon.classList[method](`orientation--active`);
        });
    });
    // color choose
    const colorIcons = [...document.querySelectorAll(`.color`)];
    colorIcons.forEach((icon) => {
        icon.addEventListener(`click`, () => {
            const isChosen = icon.classList.contains(`color--active`);
            const method = (isChosen) ? `remove` : `add`;
            icon.classList[method](`color--active`);
        });
    });
};