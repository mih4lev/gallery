const { Router } = require(`express`);

const router = new Router();

router.get(`/`, (request, response) => {
    const { language } = request;
    const data = {
        language,
        isEventsActive: true,
        pageTitle: `arTE Gallery | events`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render('events', data);
});

router.get(`/:id`, (request, response) => {
    const { language, params: { id: eventID }} = request;
    const data = {
        language,
        isEventsActive: true,
        pageTitle: `arTE Gallery | article`,
        metaDescription: ``,
        metaKeywords: ``,
        eventID
    };
    response.render('article', data);
});

module.exports = router;