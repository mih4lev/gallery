const { Router } = require(`express`);
const router = new Router();

router.get(`/collection`, (request, response) => {
    response.send(`collection page`);
});

router.get(`/collection/:id`, (request, response) => {
    const pictureID = request.params.id;
    response.send(`picture ${pictureID} page`);
});

module.exports = router;