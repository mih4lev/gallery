const { Router } = require(`express`);
const cors = require('cors');
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

router.get(`/`, (request, response) => {
    response.send(`index page API`);
});

router.get(`/options`, (request, response) => {
    response.send(`options API`);
});

router.get(`/collection`, (request, response) => {
    response.send(`collection API`);
});

router.get(`/authors`, (request, response) => {
    response.send(`authors API`);
});

router.get(`/art-space`, (request, response) => {
    response.send(`art space API`);
});

router.get(`/delivery`, (request, response) => {
    response.send(`delivery API`);
});

router.get(`/orders`, cors(corsOptions), (request, response) => {
    response.send(`GET options API`);
});

router.post(`/orders`, cors(corsOptions), (request, response) => {
    console.log(request.body);
    // new Date(timestamp).toISOString() - time of order
    const sendResponse = {
        code: 200
    };
    response.json(sendResponse);
});

module.exports = router;