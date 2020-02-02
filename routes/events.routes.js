const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageEvent } = require("../models/events.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `events`;
    const data = await collectData(request, pageLink);
    data.isEventsActive = true;
    response.render(pageLink, data);
});

router.get(`/:eventLink`, async (request, response) => {
    const { params: { eventLink }} = request;
    const pageLink = `article`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.eventData = await requestLanguageEvent(eventLink, lang);
    data.isEventsActive = true;
    data.isArticleActive = true;
    console.log(data);
    const eventPhoto = data.eventData.eventPhoto;
    data.hasEventPhoto = (eventPhoto !== `NULL` && eventPhoto !== null);
    response.render(pageLink, data);
});

module.exports = router;