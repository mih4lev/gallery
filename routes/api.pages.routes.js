const { Router } = require(`express`);
const {
    requestPageList, requestPage, updatePage
} = require("../models/pages.model");

const router = new Router();

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestPageList();
    response.send(data);
});
router.get(`/:pageLink`, async (request, response) => {
    const { params: { pageLink }} = request;
    const data = await requestPage(pageLink);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:pageID`, async (request, response) => {
    const { params: { pageID }} = request;
    const data = await updatePage(pageID, request.body);
    await response.json(data);
});

module.exports = router;