const { Router } = require(`express`);
const { requestDB } = require(`../models/db.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const { language } = request;
    const RU = (language === `ru`);
    const query = `SELECT * FROM pages WHERE pageLink = 'home'`;
    const {
        0: {
            titleRU, metaDescriptionRU, metaKeywordsRU,
            titleEN, metaDescriptionEN, metaKeywordsEN,
        }
    } = await requestDB(query);
    const title = (RU) ? titleRU : titleEN;
    const description = (RU) ? metaDescriptionRU : metaDescriptionEN;
    const keywords = (RU) ? metaKeywordsRU : metaKeywordsEN;
    const data = {
        language,
        pageTitle: title,
        metaDescription: description,
        metaKeywords: keywords
    };
    response.render(`home`, data);
});

router.get(`/404`, (request, response) => {
    const { language } = request;
    const data = {
        language,
        pageTitle: `arTE Gallery | 404`,
        metaDescription: ``,
        metaKeywords: ``
    };
    response.render(`404`, data);
});

module.exports = router;