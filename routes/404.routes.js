const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageEvents } = require("../models/events.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `404`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.anotherEvents = await requestLanguageEvents(lang, 3);
    data.anotherEvents.forEach((event) => {
        event.hasPhoto = (event.eventPhoto !== `NULL` && event.eventPhoto !== null);
    });
    response.render(pageLink, data);
});

module.exports = router;