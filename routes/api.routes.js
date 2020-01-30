const { Router } = require(`express`);
const { requestPosts } = require("../models/instagram.model");
const { currency } = require("../models/currency.model");
const router = new Router();

router.get(`/`, (request, response) => {
    response.send(`index page API`);
});

router.get(`/collection`, (request, response) => {
    response.send(`collection API`);
});

router.get(`/art-space`, (request, response) => {
    response.send(`art space API`);
});

router.get(`/delivery`, (request, response) => {
    response.send(`delivery API`);
});

router.get(`/instagram`, async (request, response) => {
    const data = await requestPosts();
    await response.json(data);
});

router.get(`/currency`, async (request, response) => {
    const data = await currency();
    await response.json(data);
});

module.exports = router;