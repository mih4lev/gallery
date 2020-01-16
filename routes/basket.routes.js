const { Router } = require(`express`);
const { requestLanguage } = require("../models/utils.model");

const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        language: requestLanguage(request),
        pageTitle: `arTE Gallery | basket`,
        metaDescription: ``,
        metaKeywords: ``,
    };
    response.render('basket', data);
});

module.exports = router;