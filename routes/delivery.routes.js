const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `delivery`;
    const data = await collectData(request, pageLink);
    data.isDeliveryActive = true;
    response.render(pageLink, data);
});

module.exports = router;