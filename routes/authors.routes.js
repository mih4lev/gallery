const { Router } = require(`express`);
const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        isAuthorsActive: true,
        pageTitle: `arTE Gallery | authors`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('authors', data);
});

router.get(`/:painter`, (request, response) => {
    const { params: { painter: painterName }} = request;
    const data = {
        isAuthorsActive: true,
        pageTitle: `arTE Gallery | painter`,
        metaDescription: ``,
        metaKeywords: ``,
        painterName
    };
    response.render('painter', data);
});

module.exports = router;