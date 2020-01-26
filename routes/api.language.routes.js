const { Router } = require(`express`);
const {
    requestLanguageList, requestLanguage, updateLanguage
} = require("../models/language.model");

const router = new Router();

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestLanguageList();
    response.send(data);
});
router.get(`/:lang`, async (request, response) => {
    const { params: { lang }} = request;
    const data = await requestLanguage(lang);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:langSelector`, async (request, response) => {
    const { params: { langSelector }} = request;
    const data = await updateLanguage(langSelector, request.body);
    await response.json(data);
});

module.exports = router;