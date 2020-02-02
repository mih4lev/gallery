const { Router } = require(`express`);
const multer = require(`multer`);
const upload = multer({ dest: `public/photos` });
const {
    requestAuthorList, requestAuthor, saveAuthor, updateAuthorPhoto, 
    updateAuthor, deleteAuthor, requestAuthorRewards, requestAuthorEducations, 
    requestAuthorExhibitions, requestAuthorPictures, requestLanguageAuthor,
    requestLanguageAuthors
} = require("../models/authors.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveAuthor(request.body);
    await response.json(data);
});
router.post(`/:authorID/photo`, upload.single('authorPhoto'), async (request, response) => {
    const { params: { authorID }, file } = request;
    const data = await updateAuthorPhoto(authorID, file);
    response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestAuthorList();
    response.send(data);
});
router.get(`/lang/:lang/limit/:limit`, async (request, response) => {
    const { params: { lang, limit }} = request;
    const data = await requestLanguageAuthors(lang, limit);
    response.send(data);
});
router.get(`/lang/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLanguageAuthors(lang);
    response.send(data);
});
router.get(`/:authorID`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await requestAuthor(authorID);
    response.send(data);
});
router.get(`/:authorID/rewards`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await requestAuthorRewards(authorID);
    response.send(data);
});
router.get(`/:authorID/educations`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await requestAuthorEducations(authorID);
    response.send(data);
});
router.get(`/:authorID/exhibitions`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await requestAuthorExhibitions(authorID);
    response.send(data);
});
router.get(`/:authorID/pictures`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await requestAuthorPictures(authorID);
    response.send(data);
});
router.get(`/:authorID/lang/:lang`, async (request, response) => {
    const { params: { authorID, lang }} = request;
    const data = await requestLanguageAuthor(authorID, lang);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:authorID`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await updateAuthor(authorID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:authorID`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await deleteAuthor(authorID);
    response.send(data);
});

module.exports = router;