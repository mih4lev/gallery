export const translateEvents = () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        const eventsList = [...document.querySelectorAll(`.eventsList .event`)];
        if (!eventsList.length) return false;
        const moreResponse = await fetch(`/api/events/lang/${lang}`);
        const result = await moreResponse.json();
        eventsList.forEach((event, index) => {
            event.querySelector(`.eventLink`).innerText = result[index].eventTitle;
            event.querySelector(`.eventDescription`).innerText = result[index].eventAnnotation;
            event.querySelector(`.eventTheme`).innerText = result[index].categoryTitle;
        });
    });
};

export const showMoreEvents = async () => {
    const interestButton = document.querySelector(`.interestButton`);
    const eventList = document.querySelector(`.eventsList`);
    if (!interestButton || !eventList) return false;
    const lang = document.querySelector(`html`).getAttribute(`lang`);
    const eventsResponse = await fetch(`/api/events/lang/${lang}`);
    const result = await eventsResponse.json();
    const eventsCount = result.length;
    const checkButton = () => {
        const visibleCount = [...document.querySelectorAll(`.eventsList .event`)].length;
        if (visibleCount < eventsCount) return false;
        document.querySelector(`.events .wrapper`).removeChild(interestButton);
    };
    interestButton.addEventListener(`click`, (event) => {
        event.preventDefault();
        const visibleCount = [...document.querySelectorAll(`.eventsList .event`)].length;
        result.forEach((event, index) => {
            if (index < visibleCount) return false;
            if (index > (visibleCount + 8)) return false;
            const cloneNode = document.querySelector(`.eventsList .event`).cloneNode(true);
            const photoLink = cloneNode.querySelector(`.eventPhotoLink`);
            photoLink.setAttribute(`href`, `/events/${event.eventLink}`);
            photoLink.innerHTML = ``;
            if (event.eventPhoto !== null || event.eventPhoto !== `NULL`) {
                const photoNode = document.createElement(`img`);
                photoNode.src = `/photos/events/${event.eventPhoto}.png`;
                photoNode.setAttribute(`alt`, event.eventTitle);
                photoNode.classList.add(`eventPhoto`, `similarPhoto`);
                photoLink.appendChild(photoNode);
            } else {
                const photoNode = document.createElement(`div`);
                photoNode.classList.add(`eventPhoto`, `similarPhoto`, `defaultPhoto`);
                photoLink.appendChild(photoNode);
            }
            const eventLink = document.querySelector(`.eventLink`);
            eventLink.setAttribute(`href`, `/events/${event.eventLink}`);
            eventLink.innerText = event.eventTitle;
            document.querySelector(`.eventDescription`).innerText = event.eventAnnotation;
            document.querySelector(`.eventTheme`).innerText = event.categoryTitle;
            eventList.appendChild(cloneNode);
        });
        checkButton();
    });
};

export const respondInterestBlock = () => {

    const interestBlocks = [...document.querySelectorAll(`.interestItem`)];
    const parentBlock = document.querySelector(`.interestList`);
    const moveLine = 50;

    if (!interestBlocks.length || !parentBlock) return false;

    interestBlocks.forEach((block, index) => {
        block.classList.add(`interestItem--${index + 1}`);
        block.addEventListener(`click`, (event) => {
            const windowSize = window.innerWidth;
            if (windowSize > 768) return false;
            const { target } = event;
            const isBlock = target.classList.contains(`interestItem`);
            const clickedBlock = (isBlock) ? target : target.closest(`.interestItem`);
            if (clickedBlock.classList.contains(`interestItem--active`)) return false;
            interestBlocks.forEach((block) => block.classList.remove(`interestItem--active`));
            clickedBlock.classList.add(`interestItem--active`);
            const offset = (windowSize >= 480) ? 580 : 460;
            parentBlock.style.marginLeft = (index === 0 || index === 1) ? `0` : `-${offset}px`;
            parentBlock.style.marginRight = (index === 1 || index === 2) ? `0` : `-${offset}px`;
        }, true);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    parentBlock.addEventListener(`touchstart`, (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, false);

    parentBlock.addEventListener(`touchend`, (event) => {
        const windowSize = window.innerWidth;
        if (windowSize > 768) return false;
        touchEndX = event.changedTouches[0].clientX;
        const offset = (windowSize >= 480) ? 580 : 460;
        const swipe = (blockID, isLeft, isRight) => {
            interestBlocks.forEach((block) => block.classList.remove(`interestItem--active`));
            document.querySelector(`.interestItem--${blockID}`).classList.add(`interestItem--active`);
            const leftX = (isLeft) ? `-${offset}px` : 0;
            const rightX = (isRight) ? `-${offset}px` : 0;
            parentBlock.style.marginLeft = leftX;
            parentBlock.style.marginRight = rightX;
        };
        if ((touchStartX - touchEndX < 0) && (touchEndX - touchStartX > moveLine)) {
            // left swipe
            if (document.querySelector(`.interestItem--3`).classList.contains(`interestItem--active`)) {
                return swipe(2, false, false);
            }
            return swipe(1, false, true);
        } else if ((touchStartX - touchEndX > 0) && (touchStartX - touchEndX > moveLine)) {
            // right swipe
            if (document.querySelector(`.interestItem--1`).classList.contains(`interestItem--active`)) {
                return swipe(2, false, false);
            }
            return swipe(3, true, false);
        }
    }, false);

};

