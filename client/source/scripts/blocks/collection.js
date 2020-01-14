import Masonry from "masonry-layout";

export const setPicturesLayout = () => {
    // set pictures layout
    setTimeout(() => {
        const pictureList = document.querySelector(`.pictureList`);
        new Masonry( pictureList, {
            itemSelector: `.picture`
        });
    }, 200);
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
            const dropdownMenu = element.nextSibling;
            const isActive = (dropdownMenu.style.opacity === `1`);
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
        // add wheel listener at list
        list.addEventListener(`wheel`, (event) => {
            event.preventDefault();
            const scrolled = Number(list.dataset.scroll) || 0;
            const newScroll = ((event.deltaY) > 0) ? scrolled - step : scrolled + step;
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
        });
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
        const minValueNode = rangeWrapper.querySelector(`.labelMin`);
        const minValue = Number(minValueNode.innerText);
        const maxValueNode = rangeWrapper.querySelector(`.labelMax`);
        const maxValue = Number(maxValueNode.innerText);
        const valueRange = maxValue - minValue;
        const step =
            (valueRange / 1000 > 100) ? 1000 :
                (valueRange / 500 > 100) ? 500 :
                    (valueRange / 100 > 100) ? 100 :
                        (valueRange / 50 > 500) ? 50 : 10;
        const rangeLine = rangeWrapper.querySelector(`.range`);
        const maxRange = rangeLine.offsetWidth;
        const rangeMinButton = rangeWrapper.querySelector(`.rangeMin`);
        const { left: minButtonOffset } = coors(rangeMinButton);
        const rangeMaxButton = rangeWrapper.querySelector(`.rangeMax`);
        const { left: maxButtonOffset } = coors(rangeMaxButton);
        let buttonFinishCoors = 0;
        const leftMoveHandler = (event) => {
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
            minValueNode.innerText = (Math.round(Math.round(value) / step) * step) + minValue;
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
        rangeMinButton.addEventListener(`touchstart`, () => {
            document.addEventListener(`touchmove`, leftMoveHandler);
            document.addEventListener(`touchend`, (event) => {
                buttonFinishCoors = event.pageX || event.changedTouches[0].pageX;
                document.removeEventListener(`touchmove`, leftMoveHandler);
            });
        });
        const rightMoveHandler = (event) => {
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
            maxValueNode.innerText = maxValue - (Math.round(Math.round(value) / step) * step);
            rangeMaxButton.style[`right`] = `${rangeSize}px`;
            rangeLine.style[`right`] = `${rangeSize}px`;
        };
        rangeMaxButton.addEventListener(`mousedown`, () => {
            document.addEventListener(`mousemove`, rightMoveHandler);
            document.addEventListener(`mouseup`, ({ pageX }) => {
                buttonFinishCoors = pageX;
                document.removeEventListener(`mousemove`, rightMoveHandler);
            });
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