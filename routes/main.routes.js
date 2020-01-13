const { Router } = require(`express`);
const router = new Router();

router.get([`/`, `/index`], (request, response) => {
    response.send(`index page`);
});

router.get(`/404`, (request, response) => {
    response.send(`404 page`);
});

module.exports = router;