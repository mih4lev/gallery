const { Router } = require(`express`);
const router = new Router();

router.get(`/authors`, (request, response) => {
    const data = {
        isAuthorsActive: true
    };
    response.render('authors', data);
});

router.get(`/authors/:name`, (request, response) => {
    const authorName = request.params.name;
    response.send(`author ${authorName} page`);
});

module.exports = router;