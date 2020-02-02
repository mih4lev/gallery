const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageEvent, requestLanguageEvents } = require("../models/events.model");

const router = new Router();

router.get(`/`, async (request, response) => {
    const pageLink = `events`;
    const data = await collectData(request, pageLink);
    const lang = data.language;
    data.isEventsActive = true;
    data.events = await requestLanguageEvents(lang, 9);
    data.hasMoreButton = (data.events.length >= 9);
    data.events.forEach((event) => {
        event.hasPhoto = (event.eventPhoto !== `NULL` && event.eventPhoto !== null);
    });
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
    const formText = (text) => text.replace(/([\.\?\!])/g, "$1<br><br>");
    data.eventData.formatedText = (data.eventData.eventText) ? formText(data.eventData.eventText) : ``;
    data.anotherEvents = await requestLanguageEvents(lang, 3, data.eventData.eventID);
    data.anotherEvents.forEach((event) => {
        event.hasPhoto = (event.eventPhoto !== `NULL` && event.eventPhoto !== null);
    });
    const eventPhoto = data.eventData.eventPhoto;
    data.hasEventPhoto = (eventPhoto !== `NULL` && eventPhoto !== null);
    response.render(pageLink, data);
});

module.exports = router;