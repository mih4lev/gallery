const { Router } = require(`express`);
const { requestLanguage } = require("../models/utils.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const data = {
        language: requestLanguage(request),
        pageTitle: `arTE Gallery | home`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render(`home`, data);

});

router.get(`/404`, (request, response) => {
    const data = {
        language: requestLanguage(request),
        pageTitle: `arTE Gallery | 404`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render(`404`, data);
});

module.exports = router;