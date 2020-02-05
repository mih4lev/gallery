const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const {
    requestLanguagePictures, requestLanguagePicture,
    requestLanguageFilters
} = require("../models/pictures.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `collection`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.picturesData = await requestLanguagePictures(lang, 10);
    data.picturesData.forEach((picture) => {
        picture.cartButton = data.cartButton;
        picture.sizeLabel = data.sizeLabel;
        picture.lang = data.language;
        picture.priceTitle = (lang === `en`) ? `euro` : `rub`;
        picture.photo = picture.photos[0].photoLink;
    });
    data.filters = await requestLanguageFilters(lang);
    data.filters.priceTitle = (lang === `en`) ? `euro` : `rub`;
    data.isCollectionActive = true;
    console.log(data.picturesData[0].photos);
    response.render(pageLink, data);
});

router.get(`/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const pageLink = `picture`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.pictureData = await requestLanguagePicture(pictureID, lang);
    if (!data.pictureData.pictureID) {
        return response.status(404).redirect(`/404`);
    }
    data.isCollectionActive = true;
    data.isPictureActive = true;
    data.pictureData.photos.forEach((photo) => {
        photo.isAdmin = data.isAdmin;
        photo.hasPhoto = (photo.photoLink !== `NULL` && photo.photoLink !== null);
    });
    data.pictureData.mainPicture = data.pictureData.photos[0];
    response.render(pageLink, data);
});

module.exports = router;