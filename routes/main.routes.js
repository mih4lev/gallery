const { Router } = require(`express`);
const { requestDB } = require(`../models/db.model`);

const router = new Router();

router.get(`/`, async (request, response) => {
    const { language } = request;
    // const query = `SELECT * FROM pages_ru WHERE name = 'index'`;
    // const {
    //     0: { title, description, keywords }
    // } = await requestDB(query);
    const title = `arTE Gallery | home`;
    const description = `...`;
    const keywords = `...`;
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