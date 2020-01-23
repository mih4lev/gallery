const articleScroll = () => {
    const articleWrapper = document.querySelector(`.articleTextWrapper`);
    if (!articleWrapper) return false;
    const overflowWrapper = document.querySelector(`.overflowWrapper`);
    const articleText = document.querySelector(`.articleText`);
    const scrollNode = document.querySelector(`.scrollNode`);
    const step = 14;
    const scrollHeight = () => {
        const { offsetHeight: wrapperHeight } = articleWrapper;
        const { offsetHeight: textHeight } = articleText;
        return (wrapperHeight / textHeight) * wrapperHeight;
    };
    scrollNode.style.height = `${scrollHeight()}px`;
    window.addEventListener('resize', () => {
        scrollNode.style.height = `${scrollHeight()}px`;
        scrollNode.style.top = `0`;
        articleText.style.marginTop = `0`;
        articleText.dataset.overflow = `0`;
    });
    const scrollText = (scrollSize) => {
        // variables
        const wrapperHeight = articleWrapper.offsetHeight;
        const textHeight = articleText.offsetHeight;
        const visibleTextHeight = overflowWrapper.offsetHeight;
        const scrollHeight = (wrapperHeight / textHeight) * wrapperHeight;
        scrollNode.style.height = `${scrollHeight}px`;
        // logic
        const { dataset: { overflow = 0 }} = articleText;
        const setOverflow = Number(overflow) + scrollSize;
        const maxOverflow = (setOverflow - visibleTextHeight) * -1;
        const sizeOverflow =
            (setOverflow >= 0) ? 0 :
                (maxOverflow >= (textHeight + 14)) ? (visibleTextHeight - textHeight) :
                    setOverflow;
        articleText.dataset.overflow = `${sizeOverflow}`;
        articleText.style.marginTop = `${sizeOverflow}px`;
        const scrollingHeight = (wrapperHeight - scrollHeight);
        const steps = (textHeight - (visibleTextHeight)) / 14;
        const currentStep = (sizeOverflow * -1) / 14;
        const scrollTop = ((scrollingHeight) / steps) * (currentStep);
        scrollNode.style.top = `${scrollTop}px`;
    };
    articleWrapper.addEventListener(`wheel`, (event) => {
        const windowSize = window.innerWidth;
        if (windowSize < 768) return false;
        event.preventDefault();
        const { deltaY } = event;
        const isScrollDown = (deltaY > 0);
        const scrollSize = (isScrollDown) ? (step * -1) : step;
        scrollText(scrollSize);
    });
    let touchStartY = 0;
    let touchEndY = 0;
    articleWrapper.addEventListener(`touchstart`, (event) => {
        event.preventDefault();
        event.stopPropagation();
        touchStartY = event.changedTouches[0].clientY;
    }, false);
    articleWrapper.addEventListener(`touchend`, (event) => {
        event.preventDefault();
        event.stopPropagation();
        touchEndY = event.changedTouches[0].clientY;
        const slideSize = Math.round((touchEndY - touchStartY) / step) * step;
        scrollText(slideSize);
    }, false);
};

module.exports = { articleScroll };