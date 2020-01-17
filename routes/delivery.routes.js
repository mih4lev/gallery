const { Router } = require(`express`);

const router = new Router();

router.get(`/`, (request, response) => {
    const { language } = request;
    const data = {
        language,
        isDeliveryActive: true,
        pageTitle: `arTE Gallery | delivery`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('delivery', data);
});

module.exports = router;