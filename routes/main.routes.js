const { Router } = require(`express`);
const router = new Router();

router.get([`/`, `/index`], (request, response) => {
    const data = {};
    response.render('home', data);
});

router.get(`/404`, (request, response) => {
    const data = {};
    response.render('404', data);
});

module.exports = router;