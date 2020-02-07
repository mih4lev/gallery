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
    const changePhoto = (picture, original, position) => {
        return () => {
            mainPicture.style.opacity = `0`;
            tempPhoto.addEventListener(`load`, () => {
                mainPicture.src = picture;
                setTimeout(() => {
                    mainPicture.style.opacity = `1`;
                    mainPicture.dataset.original = original;
                    mainPicture.dataset.position = position;
                }, 200);
            });
            setTimeout(() => {
                tempPhoto.src = picture;
            }, 200);
        };
    };
    thumbs.forEach((thumb, index) => {
        const { dataset: { picture, original }} = thumb;
        thumb.addEventListener(`click`, changePhoto(picture, original, index + 1))
    });
};

const checkVisible = (button, isHidden) => {
    button.style.opacity = (isHidden) ? `0` : `1`;
    button.style.cursor = (isHidden) ? `default` : `pointer`;
};

const showPhoto = (gallery, galleryNode, position) => {
    const isFirst = (position === 1);
    const isLast = (position === gallery.length);
    const photoLink = gallery[position - 1];
    const photoNode = galleryNode.querySelector(`.originalPhoto`);
    photoNode.addEventListener(`load`, () => {
        photoNode.style.opacity = `1`;
    });
    photoNode.src = photoLink;
    photoNode.dataset.position = position;
    const leftButton = galleryNode.querySelector(`.moveArrow--left`);
    checkVisible(leftButton, isFirst);
    const rightButton = galleryNode.querySelector(`.moveArrow--right`);
    checkVisible(rightButton, isLast);
};

const arrowClickHandler = (photoNode, gallery, galleryNode) => {
    return ({ target }) => {
        const { dataset: { position }} = photoNode;
        const currentPosition = Number(position);
        const isLeft = (target.classList.contains(`moveArrow--left`));
        const newPosition = (isLeft) ? currentPosition - 1 : currentPosition + 1;
        if (!gallery[newPosition - 1]) return false;
        photoNode.style.opacity = `0`;
        showPhoto(gallery, galleryNode, newPosition);
    }
};

const cloneGalleryTemplate = (gallery, position) => {
    const bodyNode = document.querySelector(`body`);
    const galleryTemplate = document.querySelector(`.pictureGallery`);
    const templateClone = galleryTemplate.content.cloneNode(true);
    const galleryNode = templateClone.querySelector(`.galleryWrapper`);
    const photoNode = galleryNode.querySelector(`.originalPhoto`);
    const arrowHandler = arrowClickHandler(photoNode, gallery, galleryNode);
    const leftButton = galleryNode.querySelector(`.moveArrow--left`);
    const rightButton = galleryNode.querySelector(`.moveArrow--right`);
    leftButton.addEventListener(`click`, arrowHandler);
    rightButton.addEventListener(`click`, arrowHandler);
    const closeButton = galleryNode.querySelector(`.closeButton`);
    closeButton.addEventListener(`click`, () => {
        bodyNode.removeChild(galleryNode);
    });
    showPhoto(gallery, galleryNode, position);
    bodyNode.appendChild(galleryNode);
    return galleryNode;
};

const thumbClickHandler = (gallery) => {
    return ({ target }) => {
        const windowSize = window.innerWidth;
        if (windowSize < 768) return false;
        const { dataset: { position }} = target;
        cloneGalleryTemplate(gallery, Number(position));
    };
};

const receiveOriginalURL = ({ dataset: { original }}) => original;

export const showGallery = () => {
    const photoWrapper = document.querySelector(`.picturePhotoWrapper`);
    const mainPicture = document.querySelector(`.picturePhoto`);
    if (!photoWrapper || !mainPicture) return false;
    const possiblePhotoNodes = [...document.querySelectorAll(`.interestPhoto`)];
    const gallery = possiblePhotoNodes.map(receiveOriginalURL);
    mainPicture.addEventListener(`click`, thumbClickHandler(gallery));
};