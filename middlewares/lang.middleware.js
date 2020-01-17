const detectLanguage = (request, response, next) => {
    const {
        headers: { 'accept-language': headerLanguage },
        cookies: { language: cookieLanguage }
    } = request;
    request.language = (cookieLanguage) ?
        cookieLanguage :
        headerLanguage.substr(0, 2);
    next();
};

module.exports = detectLanguage;