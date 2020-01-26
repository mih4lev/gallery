const { Router } = require(`express`);
const {
    requestLanguageList, requestLanguage, requestSelectors, 
    requestSelectorLanguage, updateLanguage
} = require("../models/language.model");

const router = new Router();

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestLanguageList();
    response.json(data);
});
router.get(`/list/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLanguage(lang);
    response.json(data);
});
router.get(`/selector/:langSelector`, async (request, response) => {
    const { params: { langSelector }} = request;
    const data = await requestSelectorLanguage(langSelector);
    response.json(data);
});
router.get(`/selectors`, async (request, response) => {
    const data = await requestSelectors();
    response.json(data);
});

// PUT | UPDATE
router.put(`/:langSelector`, async (request, response) => {
    const { params: { langSelector }} = request;
    const data = await updateLanguage(langSelector, request.body);
    await response.json(data);
});

module.exports = router;