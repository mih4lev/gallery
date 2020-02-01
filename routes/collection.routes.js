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
    data.isCollectionActive = true;
    data.isPictureActive = true;
    if (!data.pictureData.pictureID) {
        return response.status(404).redirect(`/404`);
    }
    response.render(pageLink, data);
});

module.exports = router;