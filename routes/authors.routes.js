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
        author.pictures.forEach((picture) => {
            picture.authorID = author.authorID;
        });
    });
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
    if (data.picturesData.length) {
        data.picturesData.forEach((picture) => {
            picture.cartButton = data.cartButton;
            picture.sizeLabel = data.sizeLabel;
            picture.lang = data.language;
            picture.priceTitle = (lang === `en`) ? `euro` : `rub`;
            picture.hasSalePrice = (picture.picturePriceSale !== 0);
            picture.hasPhoto = !!(picture.photos[0]);
            picture.pictureLabel =
                (picture.hasSalePrice) ? `photoLabel--sale` :
                    (picture.pictureTime <= 30) ? `photoLabel--new` :
                        `photoLabel--regular`;
            if (picture.photos[0]) {
                picture.photo = picture.photos[0].photoLink;
            }
        });
    }
    response.render(pageLink, data);
});

module.exports = router;