const { Router } = require(`express`);
const router = new Router();

router.get(`/delivery`, (request, response) => {
    const data = {
        isDeliveryActive: true
    };
    response.render('delivery', data);
});

module.exports = router;