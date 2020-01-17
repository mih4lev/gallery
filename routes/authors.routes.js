const { Router } = require(`express`);

const router = new Router();

router.get(`/`, (request, response) => {
    const { language } = request;
    const data = {
        language,
        isAuthorsActive: true,
        pageTitle: `arTE Gallery | authors`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('authors', data);
});

router.get(`/:painter`, (request, response) => {
    const { language, params: { painter: painterName }} = request;
    const data = {
        language,
        isAuthorsActive: true,
        pageTitle: `arTE Gallery | painter`,
        metaDescription: ``,
        metaKeywords: ``,
        painterName
    };
    response.render('painter', data);
});

module.exports = router;