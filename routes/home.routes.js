const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageEvents } = require("../models/events.model");
const { requestLanguageAuthors } = require(`../models/authors.model`);
const { requestLangCollectionList } = require("../models/collection.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `home`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    await Promise.all([
        data.collection = await requestLangCollectionList(lang),
        data.authors = await requestLanguageAuthors(lang, 3),
        data.events = await requestLanguageEvents(lang, 3)
    ]);
    data.collection.forEach((picture) => {
        picture.isAdmin = request.isAdmin;
    });
    data.isSingleAuthor = (data.authors.length === 1);
    // data.isSingleAuthor = true;
    if (data.isSingleAuthor) {
        data.authors = data.authors[0];
        data.authors.pictures.forEach((picture) => {
            picture.authorID = data.authors.authorID;
        });
    }
    data.events.forEach((event, index) => {
        if (index === 1) event.isActive = true;
        event.hasPhoto = (event.eventPhoto !== `NULL` && event.eventPhoto !== null);
    });
    response.render(pageLink, data);
});

module.exports = router;