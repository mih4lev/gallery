const detectLanguage = (request, response, next) => {
    const {
        headers: { 'accept-language': headerLanguage },
        cookies: { language: cookieLanguage }
    } = request;
    if (!headerLanguage) return next();
    const lang = (cookieLanguage) ?
        cookieLanguage :
        headerLanguage.substr(0, 2);
    request.language = lang;
    request.languageTitle = lang.toUpperCase();
    request.isActiveRU = (lang === `ru`);
    request.isActiveEN = (lang === `en`);
    next();
};

module.exports = detectLanguage;