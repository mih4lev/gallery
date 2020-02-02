const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageAuthors, requestLanguageAuthor } = require(`../models/authors.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `authors`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.authorData = await requestLanguageAuthors(lang);
    data.isAuthorsActive = true;
    data.authorData.forEach((author) => {
        author.authorButton = data.authorButton;
        author.hasAuthorPhoto = (author.authorPhoto !== `NULL` && author.authorPhoto  !== null);
    });
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
    const authorPhoto = data.authorData.authorPhoto;
    data.hasAuthorPhoto = (authorPhoto !== `NULL` && authorPhoto !== null);
    if (!data.authorData.authorID) {
        return response.status(404).redirect(`/404`);
    }
    response.render(pageLink, data);
});

module.exports = router;