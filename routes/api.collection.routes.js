const { Router } = require(`express`);
const {
    requestLangCollectionList, collectionList,
    requestCollectionPicture, updatePicture
} = require("../models/collection.model");

const router = new Router();

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await collectionList();
    await response.json(data);
});
router.get(`/lang/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLangCollectionList(lang);
    await response.json(data);
});
router.get(`/picture/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const data = await requestCollectionPicture(pictureID);
    await response.json(data);
});

// PUT | UPDATE
router.put(`/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const data = await updatePicture(pictureID, request.body);
    await response.json(data);
});


module.exports = router;