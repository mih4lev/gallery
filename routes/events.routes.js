const { Router } = require(`express`);
const { requestLanguage } = require("../models/utils.model");

const router = new Router();

router.get(`/`, (request, response) => {
    const data = {
        language: requestLanguage(request),
        isEventsActive: true,
        pageTitle: `arTE Gallery | events`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('events', data);
});

router.get(`/:id`, (request, response) => {
    const { params: { id: eventID }} = request;
    const data = {
        language: requestLanguage(request),
        isEventsActive: true,
        pageTitle: `arTE Gallery | article`,
        metaDescription: ``,
        metaKeywords: ``,
        eventID
    };
    response.render('article', data);
});

module.exports = router;