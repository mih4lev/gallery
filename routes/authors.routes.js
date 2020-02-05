const { Router } = require(`express`);
const { collectData } = require(`../models/data.model`);
const { requestLanguageAuthors, requestLanguageAuthor } = require(`../models/authors.model`);
const { requestLanguageAuthorPictures } = require("../models/pictures.model");

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
    console.log(data.authorData[0].pictures);
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
    data.picturesData = await requestLanguageAuthorPictures(painterID, lang, 10);
    data.picturesData.forEach((picture) => {
        picture.cartButton = data.cartButton;
        picture.sizeLabel = data.sizeLabel;
        picture.lang = data.language;
        picture.priceTitle = (lang === `en`) ? `euro` : `rub`;
        picture.photo = picture.photos[0].photoLink;
    });
    response.render(pageLink, data);
});

module.exports = router;