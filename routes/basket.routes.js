const { Router } = require(`express`);
const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        pageTitle: `arTE Gallery | basket`,
        metaDescription: ``,
        metaKeywords: ``,
    };
    response.render('basket', data);
});

module.exports = router;