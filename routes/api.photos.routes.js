const { Router } = require(`express`);
const {
    savePhoto, requestPhotoList, requestPhoto,
    updatePhoto, deletePhoto
} = require("../models/photos.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await savePhoto(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestPhotoList();
    response.send(data);
});
router.get(`/:photoID`, async (request, response) => {
    const { params: { photoID }} = request;
    const data = await requestPhoto(photoID);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:photoID`, async (request, response) => {
    const { params: { photoID }} = request;
    const data = await updatePhoto(photoID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:photoID`, async (request, response) => {
    const { params: { photoID }} = request;
    const data = await deletePhoto(photoID);
    response.send(data);
});

module.exports = router;