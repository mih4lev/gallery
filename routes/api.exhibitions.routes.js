const { Router } = require(`express`);
const {
    requestExhibition, requestExhibitionList,
    saveExhibition, updateExhibition, deleteExhibition
} = require("../models/exhibitions.model");

const router = new Router();

// POST | CREATE
router.post(`/:authorID`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await saveExhibition(authorID, request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestExhibitionList();
    response.send(data);
});
router.get(`/:exhibitionID`, async (request, response) => {
    const { params: { exhibitionID }} = request;
    const data = await requestExhibition(exhibitionID);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:exhibitionID`, async (request, response) => {
    const { params: { exhibitionID }} = request;
    const data = await updateExhibition(exhibitionID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:exhibitionID`, async (request, response) => {
    const { params: { exhibitionID }} = request;
    const data = await deleteExhibition(exhibitionID);
    response.send(data);
});

module.exports = router;