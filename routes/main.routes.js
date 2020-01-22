const { Router } = require(`express`);
const { requestDB } = require(`../models/db.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const { language } = request;
    const RU = (language === `ru`);
    const query = `SELECT * FROM pages WHERE page_link = 'home'`;
    const {
        0: {
            title_ru, meta_description_ru, meta_keywords_ru,
            title_en, meta_description_en, meta_keywords_en,
        }
    } = await requestDB(query);
    const title = (RU) ? title_ru : title_en;
    const description = (RU) ? meta_description_ru : meta_description_en;
    const keywords = (RU) ? meta_keywords_ru : meta_keywords_en;
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