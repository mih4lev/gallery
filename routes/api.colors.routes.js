const { Router } = require(`express`);
const {
    saveColor, requestColorList, requestColor,
    updateColor, deleteColor
} = require("../models/colors.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveColor(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestColorList();
    response.send(data);
});
router.get(`/:colorID`, async (request, response) => {
    const { params: { colorID }} = request;
    const data = await requestColor(colorID);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:colorID`, async (request, response) => {
    const { params: { colorID }} = request;
    const data = await updateColor(colorID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:colorID`, async (request, response) => {
    const { params: { colorID }} = request;
    const data = await deleteColor(colorID);
    response.send(data);
});

module.exports = router;