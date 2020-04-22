const { requestLanguage } = require(`../models/language.model`);
const { requestLangPage } = require(`../models/pages.model`);

const collectData = async (request, page) => {
    const { language, languageTitle, isActiveRU, isActiveEN, isAdmin } = request;
    // const pageData = await requestLangPage(page, language);
    // const langData = await requestLanguage(language);
    return Object.assign(
        // langData, pageData,
        {
            language, languageTitle, isActiveRU, isActiveEN, isAdmin
        }
    );
};

module.exports = { collectData };