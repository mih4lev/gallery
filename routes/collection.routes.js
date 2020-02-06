const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { currency } = require(`../models/currency.model`);
const {
    requestLanguagePictures, requestLanguagePicture,
    requestLanguageFilters, requestLanguageAuthorPictures
} = require("../models/pictures.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `collection`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    const rate = await currency();
    data.picturesData = await requestLanguagePictures(lang, 10);
    data.picturesData.forEach((picture) => {
        picture.cartButton = data.cartButton;
        picture.sizeLabel = data.sizeLabel;
        picture.lang = data.language;
        picture.priceTitle = (lang === `en`) ? `euro` : `rub`;
        picture.hasPhoto = !!(picture.photos[0]);
        if (picture.photos[0]) {
            picture.photo = picture.photos[0].photoLink;
        }
    });
    data.filters = await requestLanguageFilters(lang);
    data.filters.priceTitle = (lang === `en`) ? `euro` : `rub`;
    if (lang === `en`) {
        const preMinPrice = data.filters.minPrice / rate;
        const preMaxPrice = data.filters.maxPrice / rate;
        const exchangeMinPrice = Math.floor((preMinPrice) * 100) / 100;
        const exchangeMaxPrice = Math.ceil((preMaxPrice) * 100) / 100;
        // data.filters.exchangeMinPrice = Math.round(exchangeMinPrice / 100) * 100;
        // data.filters.exchangeMaxPrice = Math.round(exchangeMaxPrice / 100) * 100;
        data.filters.exchangeMinPrice = exchangeMinPrice;
        data.filters.exchangeMaxPrice = exchangeMaxPrice;
    }
    console.log(data.filters.exchangeMinPrice);
    console.log(data.filters.exchangeMaxPrice);
    data.isCollectionActive = true;
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
    data.authorID = data.pictureData.authorID;
    data.anotherPictures = await requestLanguageAuthorPictures(data.authorID, lang, 5, pictureID);
    data.anotherPictures.forEach((picture) => {
        picture.hasPhoto = !!(picture.photos[0]);
        if (picture.photos[0]) {
            picture.photoLink = picture.photos[0].photoLink;
        }
    });
    console.log(data);
    response.render(pageLink, data);
});

module.exports = router;