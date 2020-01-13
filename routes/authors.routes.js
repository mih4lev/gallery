const { Router } = require(`express`);
const router = new Router();

router.get(`/authors`, (request, response) => {
    response.send(`authors page`);
});

router.get(`/authors/:name`, (request, response) => {
    const authorName = request.params.name;
    response.send(`author ${authorName} page`);
});

module.exports = router;