const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `collection`;
    const data = await collectData(request, pageLink);
    data.isCollectionActive = true;
    response.render(pageLink, data);
});

router.get(`/:id`, async (request, response) => {
    const pageLink = `picture`;
    const data = await collectData(request, pageLink);
    data.isCollectionActive = true;
    response.render(pageLink, data);
});

module.exports = router;