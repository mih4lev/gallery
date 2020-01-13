const { Router } = require(`express`);
const router = new Router();

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

router.get(`/orders`, (request, response) => {
    response.send(`options API`);
});

module.exports = router;