export const translateArticle = () => {
    document.addEventListener(`languageChange`, async ({ detail: { lang }}) => {
        const articleHeader = document.querySelector(`.articleHeader`);
        if (!articleHeader) return false;
        const { dataset: { eventLink }} = articleHeader;
        const response = await fetch(`/api/events/${eventLink}/lang/${lang}`);
        const { eventID, eventTitle, eventText, categoryTitle } = await response.json();
        articleHeader.innerText = eventTitle;
        document.querySelector(`.breadcrumbLink--active`).innerText = eventTitle;
        document.querySelector(`.articleLable`).innerText = categoryTitle;
        const formatedText = (eventText) ? eventText.replace(/([\.\?\!])/g, "$1<br><br>") : ``;
        document.querySelector(`.articleText`).innerHTML = formatedText;
        // another events
        const moreResponse = await fetch(`/api/events/lang/${lang}/limit/3/exclude/${eventID}`);
        const result = await moreResponse.json();
        const eventsList = [...document.querySelectorAll(`.eventsList .event`)];
        eventsList.forEach((event, index) => {
            event.querySelector(`.eventLink`).innerText = result[index].eventTitle;
            event.querySelector(`.eventDescription`).innerText = result[index].eventAnnotation;
            event.querySelector(`.eventTheme`).innerText = result[index].categoryTitle;
        });
    });
};

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
    // if text less then wrapper
    if (articleText.offsetHeight < articleWrapper.offsetHeight) return false;
    scrollNode.style.height = `${scrollHeight()}px`;
    let windowSize = window.innerWidth;
    const resetOptions = () => {
        if (windowSize === window.innerWidth) return false;
        windowSize = window.innerWidth;
        scrollNode.style.height = `${scrollHeight()}px`;
        scrollNode.style.top = `0`;
        articleText.style.marginTop = `0`;
        articleText.dataset.overflow = `0`;
    };
    window.addEventListener(`resize`, resetOptions);
    window.addEventListener(`orientationchange`, resetOptions);
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
        if (window.innerWidth < 768) return false;
        event.preventDefault();
        const { deltaY } = event;
        const isScrollDown = (deltaY > 0);
        const scrollSize = (isScrollDown) ? (step * -1) : step;
        scrollText(scrollSize);
    });
    let touchStartY = 0;
    let touchEndY = 0;
    articleWrapper.addEventListener(`touchstart`, (event) => {
        if (window.innerWidth < 768) return false;
        event.preventDefault();
        event.stopPropagation();
        touchStartY = event.changedTouches[0].clientY;
    }, false);
    articleWrapper.addEventListener(`touchend`, (event) => {
        if (window.innerWidth < 768) return false;
        event.preventDefault();
        event.stopPropagation();
        touchEndY = event.changedTouches[0].clientY;
        const slideSize = Math.round((touchEndY - touchStartY) / step) * step;
        scrollText(slideSize);
    }, false);
};

export const shareList = () => {
    const socialLinks = [...document.querySelectorAll(`.socialLink`)];
    if (!socialLinks.length) return false;
    const url = location.href;
    const imageSourceNode = document.querySelector(`.articlePicture`);
    if (!imageSourceNode) return false;
    const imageSource = imageSourceNode.src;
    const image = `${imageSource}`;
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
    socialLinks.forEach((link) => {
        link.addEventListener(`click`, (event) => {
            event.preventDefault();
            const { dataset: { social }} = link;
            // create new window for shared link
            const newWindowOptions = `toolbar=0,status=0,width=626,height=436`;
            const URL = linksMAP[social].join(``);
            window.open(URL, `new`, newWindowOptions);
        })
    });
};