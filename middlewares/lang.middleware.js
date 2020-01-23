const detectLanguage = (request, response, next) => {
    const {
        headers: { 'accept-language': headerLanguage },
        cookies: { language: cookieLanguage }
    } = request;
    if (!headerLanguage) return next();
    request.language = (cookieLanguage) ?
        cookieLanguage :
        headerLanguage.substr(0, 2);
    next();
};

module.exports = detectLanguage;