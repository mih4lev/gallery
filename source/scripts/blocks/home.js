export const instagramPosts = async () => {
    const instagramPhotos = [...document.querySelectorAll(`.instagramPhoto`)];
    if (!instagramPhotos.length) return false;
    const response = await fetch(`/api/instagram`);
    const photos = await response.json();
    instagramPhotos.forEach((photo, index) => {
        photo.closest(`.instagramLink`).href = photos[index].link;
        photo.src = photos[index].thumb;
    });
};