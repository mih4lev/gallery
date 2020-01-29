const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageAuthor } = require(`../models/authors.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `authors`;
    const data = await collectData(request, pageLink);
    data.isAuthorsActive = true;
    response.render(pageLink, data);
});

router.get(`/:painterID`, async (request, response) => {
    const { params: { painterID }} = request;
    const pageLink = `painter`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.authorData = await requestLanguageAuthor(painterID, lang);
    data.isAuthorsActive = true;
    data.isPainterActive = true;
    response.render(pageLink, data);
});

module.exports = router;