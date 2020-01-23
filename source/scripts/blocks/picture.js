export const changePhotos = () => {
    const photoWrapper = document.querySelector(`.picturePhotoWrapper`);
    const mainPicture = document.querySelector(`.picturePhoto`);
    const thumbs = [...document.querySelectorAll(`.pictureSimilarPhoto`)];
    if (!mainPicture || !thumbs.length) return false;
    thumbs.forEach((thumb) => {
        thumb.addEventListener(`click`, (event) => {
            event.preventDefault();
            const { dataset: { picture }} = thumb;
            mainPicture.src = picture;
            console.dir(photoWrapper);
        });
    });
};