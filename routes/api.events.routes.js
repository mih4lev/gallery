const { Router } = require(`express`);
const {
    saveEvent, requestEventList, requestEvent,
    updateEvent, deleteEvent
} = require("../models/events.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveEvent(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestEventList();
    response.send(data);
});
router.get(`/:eventLink`, async (request, response) => {
    const { params: { eventLink }} = request;
    const data = await requestEvent(eventLink);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:eventID`, async (request, response) => {
    const { params: { eventID }} = request;
    const data = await updateEvent(eventID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:eventID`, async (request, response) => {
    const { params: { eventID }} = request;
    const data = await deleteEvent(eventID);
    response.send(data);
});

module.exports = router;