const { Router } = require(`express`);
const {
    requestPictureList, deletePicture
} = require("../models/pictures.model");

const router = new Router();

// POST | CREATE


// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestPictureList();
    response.send(data);
});

// PUT | UPDATE


// DELETE
router.delete(`/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const data = await deletePicture(pictureID);
    response.send(data);
});

module.exports = router;