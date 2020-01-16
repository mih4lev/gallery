const { Router } = require(`express`);
const { requestLanguage } = require("../models/utils.model");

const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        language: requestLanguage(request),
        isDeliveryActive: true,
        pageTitle: `arTE Gallery | delivery`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('delivery', data);
});

module.exports = router;