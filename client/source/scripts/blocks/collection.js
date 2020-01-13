import Masonry from "masonry-layout";

export const setPicturesLayout = () => {
    // set pictures layout
    setTimeout(() => {
        const pictureList = document.querySelector('.pictureList');
        new Masonry( pictureList, {
            itemSelector: '.picture'
        });
    }, 200);
};