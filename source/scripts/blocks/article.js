export const articleScroll = () => {
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
        const windowSize = window.innerWidth;
        if (windowSize < 768) return false;
        event.preventDefault();
        event.stopPropagation();
        touchStartY = event.changedTouches[0].clientY;
    }, false);
    articleWrapper.addEventListener(`touchend`, (event) => {
        const windowSize = window.innerWidth;
        if (windowSize < 768) return false;
        event.preventDefault();
        event.stopPropagation();
        touchEndY = event.changedTouches[0].clientY;
        const slideSize = Math.round((touchEndY - touchStartY) / step) * step;
        scrollText(slideSize);
    }, false);
};

export const shareList = () => {
    const socialLinks = document.querySelectorAll(`.socialLink`);
    if (!socialLinks) return false;
    const url = location.href;
    const imageSource = document.querySelector(`.articlePicture`).src;
    const image = `${url}${imageSource}`;
    const title = document.querySelector(`title`).innerText;
    const metaDescription = document.querySelector(`meta[name="description"]`);
    const description = (metaDescription) ? metaDescription.getAttribute(`content`) : ``;
    const linksMAP = {
        facebook: [
            `https://www.facebook.com/sharer.php`,
            `?u=${encodeURIComponent(url)}`,
            `&p[images][0]=${encodeURIComponent(image)}`
        ],
        twitter: [
            `https://twitter.com/intent/tweet`,
            `?url=${url}`,
            `&text=${title}`,
            `&hashtags=`
        ],
        vk: [
            `https://vk.com/share.php`,
            `?url=${encodeURIComponent(url)}`,
            `&image=${encodeURIComponent(image)}`,
            `&title=${encodeURIComponent(title)}`,
            `&description=${encodeURIComponent(description)}`
        ],
        ok: [
            `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview`,
            `&st.shareUrl=${encodeURIComponent(url)}`,
            `&st.imageUrl=${encodeURIComponent(image)}`,
            `&st.title=${encodeURIComponent(title)}`,
            `&st.description=${encodeURIComponent(description)}`
        ]
    };
    [...socialLinks].forEach((link) => {
        link.addEventListener(`click`, () => {
            const { dataset: { social }} = link;
            // create new window for shared link
            const newWindowOptions = `toolbar=0,status=0,width=626,height=436`;
            const URL = linksMAP[social].join(``);
            console.log(URL);
            window.open(URL, `new`, newWindowOptions);
        })
    });
};