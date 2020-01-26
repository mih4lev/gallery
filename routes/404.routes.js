const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `404`;
    const data = await collectData(request, pageLink);
    response.render(pageLink, data);
});

module.exports = router;