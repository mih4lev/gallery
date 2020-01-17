const { Router } = require(`express`);

const router = new Router();

router.get(`/`, (request, response) => {
    const { language } = request;
    const data = {
        language,
        pageTitle: `arTE Gallery | basket`,
        metaDescription: ``,
        metaKeywords: ``,
    };
    response.render('basket', data);
});

module.exports = router;