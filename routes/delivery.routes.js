const { Router } = require(`express`);
const router = new Router();

router.get(`/delivery`, (request, response) => {
    response.send(`delivery page`);
});

module.exports = router;