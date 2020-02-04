const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguagePicture } = require("../models/pictures.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `collection`;
    const data = await collectData(request, pageLink);
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
        photo.isAdmin = true;
        photo.hasPhoto = (photo.photoLink !== `NULL` && photo.photoLink !== null);
    });
    data.pictureData.mainPicture = data.pictureData.photos[0];
    console.log(data.pictureData.photos);
    response.render(pageLink, data);
});

module.exports = router;