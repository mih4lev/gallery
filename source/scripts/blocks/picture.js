export const changePhotos = () => {
    const photoWrapper = document.querySelector(`.picturePhotoWrapper`);
    const mainPicture = document.querySelector(`.picturePhoto`);
    if (!photoWrapper || !mainPicture) return false;
    const canUseWebp = () => {
        const canvas = document.createElement(`canvas`);
        if (!!(canvas.getContext && canvas.getContext(`2d`))) {
            return canvas.toDataURL(`image/webp`).indexOf(`data:image/webp`) == 0;
        }
        return false;
    };
    const thumbs = [...document.querySelectorAll(`.pictureSimilarList .similarPhoto`)];
    setTimeout(() => {
        if (!thumbs[0]) return false;
        thumbs[0].click();
    }, 300);
    if (!mainPicture || !thumbs.length) return false;
    const tempPhoto = new Image();
    const changePhoto = (picture, original) => {
        return () => {
            mainPicture.style.opacity = `0`;
            tempPhoto.addEventListener(`load`, () => {
                mainPicture.src = picture;
                setTimeout(() => {
                    mainPicture.style.opacity = `1`;
                    mainPicture.dataset.original = original;
                }, 200);
            });
            setTimeout(() => {
                tempPhoto.src = picture;
            }, 200);
        };
    };
    thumbs.forEach((thumb) => {
        const { dataset: { picture, original }} = thumb;
        thumb.addEventListener(`click`, changePhoto(picture, original))
    });
};

export const showGallery = () => {
    const photoWrapper = document.querySelector(`.picturePhotoWrapper`);
    const mainPicture = document.querySelector(`.picturePhoto`);
    if (!photoWrapper || !mainPicture) return false;
    mainPicture.addEventListener(`click`, () => {

    });
};