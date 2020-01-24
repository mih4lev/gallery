const { Router } = require(`express`);
const {
    saveOrder, requestOrderList, requestOrder, deleteOrder
} = require("../models/orders.model");
const { requestPosts } = require("../models/instagram.model");
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

module.exports = router;