const { Router } = require(`express`);
const {
    requestEducationList, saveEducation, updateEducation, deleteEducation
} = require("../models/educations.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveEducation(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestEducationList();
    response.send(data);
});

// PUT | UPDATE
router.put(`/:educationID`, async (request, response) => {
    const { params: { educationID }} = request;
    const data = await updateEducation(educationID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:educationID`, async (request, response) => {
    const { params: { educationID }} = request;
    const data = await deleteEducation(educationID);
    response.send(data);
});

module.exports = router;