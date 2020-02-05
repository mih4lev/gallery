const { Router } = require(`express`);
const multer = require(`multer`);
const upload = multer({ dest: `public/photos` });
const {
    requestPictureList, requestPicture, requestLanguagePicture,
    requestLanguagePictures, requestLanguageFilters,
    requestLanguageAuthorPictures, savePicture, updatePicture,
    addPicturePhoto, deletePicture, deletePicturePhoto
} = require("../models/pictures.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await savePicture(request.body);
    await response.json(data);
});
router.post(`/:pictureID/photo`, upload.single('picturePhoto'), async (request, response) => {
    const { params: { pictureID }, file } = request;
    const data = await addPicturePhoto(pictureID, file);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestPictureList();
    response.send(data);
});
router.get(`/lang/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLanguagePictures(lang);
    response.send(data);
});
router.get(`/lang/:lang/limit/:limit`, async (request, response) => {
    const { params: { lang, limit }} = request;
    const data = await requestLanguagePictures(lang, limit);
    response.send(data);
});
router.get(`/author/:authorID/lang/:lang`, async (request, response) => {
    const { params: { authorID, lang }} = request;
    const data = await requestLanguageAuthorPictures(authorID, lang);
    response.send(data);
});
router.get(`/author/:authorID/lang/:lang/limit/:limit`, async (request, response) => {
    const { params: { authorID, lang, limit }} = request;
    const data = await requestLanguageAuthorPictures(authorID, lang, limit);
    response.send(data);
});
router.get(`/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const data = await requestPicture(pictureID);
    response.send(data);
});
router.get(`/:pictureID/lang/:lang`, async (request, response) => {
    const { params: { pictureID, lang }} = request;
    const data = await requestLanguagePicture(pictureID, lang);
    response.send(data);
});
router.get(`/filters/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLanguageFilters(lang);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const data = await updatePicture(pictureID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:pictureID`, async (request, response) => {
    const { params: { pictureID }} = request;
    const data = await deletePicture(pictureID);
    response.send(data);
});
router.delete(`/photo/:photoID`, async (request, response) => {
    const { params: { photoID }} = request;
    const data = await deletePicturePhoto(photoID);
    await response.json(data);
});

module.exports = router;