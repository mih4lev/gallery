const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `authors`;
    const data = await collectData(request, pageLink);
    data.isAuthorsActive = true;
    response.render(pageLink, data);
});

router.get(`/:painter`, async (request, response) => {
    const pageLink = `painter`;
    const data = await collectData(request, pageLink);
    data.isAuthorsActive = true;
    response.render(pageLink, data);
});

module.exports = router;