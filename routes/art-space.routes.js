const { Router } = require(`express`);
const router = new Router();

router.get(`/art-space`, (request, response) => {
    const data = {
        isArtSpaceActive: true
    };
    response.render('art-space', data);
});

module.exports = router;