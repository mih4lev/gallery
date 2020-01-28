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
    response.send(data);
});
router.get(`/:educationID`, async (request, response) => {
    const { params: { educationID }} = request;
    const data = await requestEducation(educationID);
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