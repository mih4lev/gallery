const { Router } = require(`express`);

const router = new Router();

router.get(`/`, (request, response) => {
    const { language } = request;
    const data = {
        language,
        isCollectionActive: true,
        pageTitle: `arTE Gallery | collection`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('collection', data);
});

router.get(`/:id`, (request, response) => {
    const { language, params: { id: pictureID }} = request;
    const data = {
        language,
        isCollectionActive: true,
        pageTitle: `arTE Gallery | picture`,
        metaDescription: ``,
        metaKeywords: ``,
        pictureID
    };
    response.render('picture', data);
});

module.exports = router;