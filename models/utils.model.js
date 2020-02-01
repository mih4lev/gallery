const multer = require('multer');
const path = require('path');

const requestLanguage = (request) => {
    const {
        headers: { 'accept-language': headerLanguage },
        cookies: { language: cookieLanguage }
    } = request;
    return (cookieLanguage) ? cookieLanguage : headerLanguage.substr(0, 2);
};

module.exports = { requestLanguage };