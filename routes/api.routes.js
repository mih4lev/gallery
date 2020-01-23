const { Router } = require(`express`);
const cors = require(`cors`);
const {
    requestAuthor, requestAuthorList,
    saveAuthor, updateAuthor, deleteAuthor
} = require("../models/authors.model");
const {
    saveOrder, requestOrderList, requestOrder, deleteOrder
} = require("../models/orders.model");
const { requestPosts } = require("../models/instagram.model");
const router = new Router();

const allowedOrigins = [
    'http://artegallery.ru',
    'http://www.artegallery.ru',
    'http://localhost:5000'
];
const corsOptions = {
    origin: function(origin, callback){
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(null, false);
        }
        return callback(null, true);
    },
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
};

router.get(`/`, cors(corsOptions), (request, response) => {
    response.send(`index page API`);
});

router.get(`/options`, cors(corsOptions), (request, response) => {
    response.send(`options API`);
});

router.get(`/collection`, cors(corsOptions), (request, response) => {
    response.send(`collection API`);
});

router.get(`/authors`, cors(corsOptions), async (request, response) => {
    const data = await requestAuthorList();
    response.send(data);
});

router.get(`/authors/:authorID`, cors(corsOptions), async (request, response) => {
    const { params: { authorID }} = request;
    const data = await requestAuthor(authorID);
    response.send(data);
});

router.post(`/authors`, cors(corsOptions), async (request, response) => {
    const data = await saveAuthor(request.body);
    await response.json(data);
});

router.put(`/authors/:authorID`, cors(corsOptions), async (request, response) => {
    const { params: { authorID }} = request;
    const data = await updateAuthor(authorID, request.body);
    await response.json(data);
});

router.delete(`/authors/:authorID`, cors(corsOptions), async (request, response) => {
    const { params: { authorID }} = request;
    const data = await deleteAuthor(authorID);
    response.send(data);
});

router.get(`/art-space`, cors(corsOptions), (request, response) => {
    response.send(`art space API`);
});

router.get(`/delivery`, cors(corsOptions), (request, response) => {
    response.send(`delivery API`);
});

router.get(`/orders`, cors(corsOptions), async (request, response) => {
    const data = await requestOrderList();
    response.send(data);
});

router.get(`/orders/:orderID`, cors(corsOptions), async (request, response) => {
    const { params: { orderID }} = request;
    const data = await requestOrder(orderID);
    response.send(data);
});

router.post(`/orders`, cors(corsOptions), async (request, response) => {
    const data = await saveOrder(request.body);
    await response.json(data);
});

router.delete(`/orders/:orderID`, cors(corsOptions), async (request, response) => {
    const { params: { orderID }} = request;
    const data = await deleteOrder(orderID);
    response.send(data);
});

router.get(`/instagram`, cors(corsOptions), async (request, response) => {
    const data = await requestPosts();
    await response.json(data);
});

module.exports = router;