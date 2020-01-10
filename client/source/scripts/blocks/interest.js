export const respondInterestBlock = () => {

    const interestBlocks = [...document.querySelectorAll(`.interestItem`)];
    const parentBlock = document.querySelector(`.interestList`);

    if (!interestBlocks.length || !parentBlock) return false;

    interestBlocks.forEach((block, index) => {
        block.classList.add(`interestItem--${index + 1}`);
        block.addEventListener(`click`, (event) => {
            event.preventDefault();
            const windowSize = window.innerWidth;
            if (windowSize > 768) return false;
            const { target } = event;
            const isBlock = target.classList.contains(`interestItem`);
            const clickedBlock = (isBlock) ? target : target.closest(`.interestItem`);
            if (clickedBlock.classList.contains(`interestItem--active`)) return false;
            interestBlocks.forEach((block) => block.classList.remove(`interestItem--active`));
            clickedBlock.classList.add(`interestItem--active`);
            const offset = (windowSize >= 480) ? 480 : 460;
            parentBlock.style.marginLeft = (index == 0 || index == 1) ? `0` : `-${offset}px`;
            parentBlock.style.marginRight = (index == 1 || index == 2) ? `0` : `-${offset}px`;
        }, true);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    parentBlock.addEventListener(`touchstart`, (event) => {
        event.stopPropagation();
        touchStartX = event.changedTouches[0].clientX;
    }, false);

    parentBlock.addEventListener(`touchend`, (event) => {
        event.stopPropagation();
        const windowSize = window.innerWidth;
        if (windowSize > 768) return false;
        touchEndX = event.changedTouches[0].clientX;
        const offset = (windowSize >= 480) ? 480 : 460;
        const swipe = (blockID, isLeft, isRight) => {
            interestBlocks.forEach((block) => block.classList.remove(`interestItem--active`));
            document.querySelector(`.interestItem--${blockID}`).classList.add(`interestItem--active`);
            const leftX = (isLeft) ? `-${offset}px` : 0;
            const rightX = (isRight) ? `-${offset}px` : 0;
            parentBlock.style.marginLeft = leftX;
            parentBlock.style.marginRight = rightX;
        };
        if ((touchStartX - touchEndX < 0) && (touchEndX - touchStartX > 50)) {
            // left swipe
            if (document.querySelector(`.interestItem--3`).classList.contains(`interestItem--active`)) {
                return swipe(2, false, false);
            }
            return swipe(1, false, true);
        } else if ((touchStartX - touchEndX > 0) && (touchStartX - touchEndX > 50)) {
            // right swipe
            if (document.querySelector(`.interestItem--1`).classList.contains(`interestItem--active`)) {
                return swipe(2, false, false);
            }
            return swipe(3, true, false);
        }
    }, false);

};

