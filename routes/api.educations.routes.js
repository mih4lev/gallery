const { Router } = require(`express`);
const {
    requestEducation, requestEducationList,
    saveEducation, updateEducation, deleteEducation
} = require("../models/educations.model");

const router = new Router();

// POST | CREATE
router.post(`/:authorID`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await saveEducation(authorID, request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestEducationList();
    await response.json(data);
});
router.get(`/:educationID`, async (request, response) => {
    const { params: { educationID }} = request;
    const data = await requestEducation(educationID);
    await response.json(data);
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
    await response.json(data);
});

module.exports = router;