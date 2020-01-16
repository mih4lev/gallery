const { Router } = require(`express`);
const { requestLanguage } = require("../models/utils.model");

const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        language: requestLanguage(request),
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
        language: requestLanguage(request),
        isAuthorsActive: true,
        pageTitle: `arTE Gallery | painter`,
        metaDescription: ``,
        metaKeywords: ``,
        painterName
    };
    response.render('painter', data);
});

module.exports = router;