const { Router } = require(`express`);
const {
    saveTechnique, requestTechniqueList, requestTechnique,
    updateTechnique, deleteTechnique
} = require("../models/techniques.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveTechnique(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestTechniqueList();
    response.send(data);
});
router.get(`/:techniqueID`, async (request, response) => {
    const { params: { techniqueID }} = request;
    const data = await requestTechnique(techniqueID);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:techniqueID`, async (request, response) => {
    const { params: { techniqueID }} = request;
    const data = await updateTechnique(techniqueID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:techniqueID`, async (request, response) => {
    const { params: { techniqueID }} = request;
    const data = await deleteTechnique(techniqueID);
    response.send(data);
});

module.exports = router;