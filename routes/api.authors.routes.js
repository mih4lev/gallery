const { Router } = require(`express`);
const {
    requestAuthorList, requestAuthor, saveAuthor,
    updateAuthor, deleteAuthor, requestAuthorRewards,
    requestAuthorEducations, requestAuthorExhibitions
} = require("../models/authors.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveAuthor(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestAuthorList();
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