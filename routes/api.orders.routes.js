const { Router } = require(`express`);
const {
    saveOrder, requestOrderList, requestOrder,
    updateOrderStatus, deleteOrder
} = require("../models/orders.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const { language: lang } = request;
    const data = await saveOrder(request.body, lang);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestOrderList();
    response.send(data);
});
router.get(`/:orderNumber`, async (request, response) => {
    const { params: { orderNumber }} = request;
    const data = await requestOrder(orderNumber);
    response.send(data);
});

// PUT | UPDATE
router.put(`/status/:orderNumber`, async (request, response) => {
    const { params: { orderNumber }, body: { status }} = request;
    const data = await updateOrderStatus(orderNumber, status);
    await response.json(data);
});

// DELETE
router.delete(`/:orderID`, async (request, response) => {
    const { params: { orderID }} = request;
    const data = await deleteOrder(orderID);
    response.send(data);
});

module.exports = router;