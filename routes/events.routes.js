const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `events`;
    const data = await collectData(request, pageLink);
    data.isEventsActive = true;
    response.render(pageLink, data);
});

router.get(`/:id`, async (request, response) => {
    const pageLink = `article`;
    const data = await collectData(request, pageLink);
    data.isEventsActive = true;
    data.isArticleActive = true;
    response.render(pageLink, data);
});

module.exports = router;