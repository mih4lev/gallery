const { Router } = require(`express`);
const { requestPosts } = require("../models/instagram.model");
const { currency } = require("../models/currency.model");
const router = new Router();

router.get(`/instagram`, async (request, response) => {
    const data = await requestPosts();
    await response.json(data);
});

router.get(`/currency`, async (request, response) => {
    const data = await currency();
    await response.json(data);
});

module.exports = router;