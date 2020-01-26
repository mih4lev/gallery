export const changePhotos = () => {
    const photoWrapper = document.querySelector(`.picturePhotoWrapper`);
    const mainPicture = document.querySelector(`.picturePhoto`);
    if (!photoWrapper || !mainPicture) return false;
    const tempPicture = new Image();
    const thumbs = [...document.querySelectorAll(`.pictureSimilarPhoto`)];
    let wrapperWidth = photoWrapper.offsetWidth;
    let wrapperHeight = photoWrapper.offsetHeight;
    setTimeout(() => {
        wrapperWidth = photoWrapper.offsetWidth;
        wrapperHeight = photoWrapper.offsetHeight;
        if (!thumbs[0]) return false;
        thumbs[0].click();
    }, 300);
    if (!mainPicture || !thumbs.length) return false;
    const loadHandler = (picture) => {
        return (event) => {
            mainPicture.height = photoWrapper.offsetHeight;
            mainPicture.removeAttribute(`width`);
            const tempWidth = tempPicture.width;
            const tempHeight = tempPicture.height;
            const isWidth = (tempWidth > tempHeight);
            const isHeight = (tempHeight > tempWidth);
            if (isWidth) {
                mainPicture.removeAttribute(`width`);
                const mathHeight = tempHeight / (tempWidth / (wrapperWidth));
                const height = (wrapperHeight < mathHeight) ? wrapperHeight : mathHeight;
                mainPicture.height = height;
            }
            if (isHeight) {
                const width = tempWidth / (tempHeight / wrapperHeight);
                mainPicture.removeAttribute(`height`);
                mainPicture.width = width;
            }
            mainPicture.src = picture;
            setTimeout(() => {
                mainPicture.style.opacity = 1;
            }, 200);
        }
    };
    thumbs.forEach((thumb) => {
        thumb.addEventListener(`click`, (event) => {
            mainPicture.style.opacity = 0;
            event.preventDefault();
            const { dataset: { picture }} = thumb;
            tempPicture.addEventListener(`load`, loadHandler(picture));
            tempPicture.src = picture;
        });
    });
};