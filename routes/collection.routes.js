const { Router } = require(`express`);
const { requestLanguage } = require("../models/utils.model");

const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        language: requestLanguage(request),
        isCollectionActive: true,
        pageTitle: `arTE Gallery | collection`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('collection', data);
});

router.get(`/:id`, (request, response) => {
    const { params: { id: pictureID }} = request;
    const data = {
        language: requestLanguage(request),
        isCollectionActive: true,
        pageTitle: `arTE Gallery | picture`,
        metaDescription: ``,
        metaKeywords: ``,
        pictureID
    };
    response.render('picture', data);
});

module.exports = router;