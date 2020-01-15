const { Router } = require(`express`);
const router = new Router();

router.get([`/`, `/index`], (request, response) => {
    const data = {};
    response.render('home', data);
});

router.get(`/404`, (request, response) => {
    response.send(`404 page`);
});

module.exports = router;