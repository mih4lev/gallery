const { Router } = require(`express`);
const multer = require(`multer`);
const upload = multer({ dest: `public/photos` });
const {
    saveEvent, requestEventList, requestEvent, requestLanguageEvent,
    requestEventWithID, requestLanguageEvents,
    updateEvent, updateEventPhoto, deleteEvent
} = require("../models/events.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveEvent(request.body);
    await response.json(data);
});
router.post(`/:eventID/photo`, upload.single('eventPhoto'), async (request, response) => {
    const { params: { eventID }, file } = request;
    const data = await updateEventPhoto(eventID, file);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestEventList();
    response.send(data);
});
router.get(`/id/:eventID`, async (request, response) => {
    const { params: { eventID }} = request;
    const data = await requestEventWithID(eventID);
    response.send(data);
});
router.get(`/lang/:lang/limit/:limit/exclude/:eventID`, async (request, response) => {
    const { params: { lang, limit, eventID }} = request;
    const data = await requestLanguageEvents(lang, limit, eventID);
    response.send(data);
});
router.get(`/lang/:lang/limit/:limit`, async (request, response) => {
    const { params: { lang, limit }} = request;
    const data = await requestLanguageEvents(lang, limit);
    response.send(data);
});
router.get(`/lang/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLanguageEvents(lang);
    response.send(data);
});
router.get(`/:eventLink`, async (request, response) => {
    const { params: { eventLink }} = request;
    const data = await requestEvent(eventLink);
    response.send(data);
});
router.get(`/:eventLink/lang/:lang`, async (request, response) => {
    const { params: { eventLink, lang }} = request;
    const data = await requestLanguageEvent(eventLink, lang);
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