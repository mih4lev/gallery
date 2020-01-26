const { requestDB } = require(`./db.model`);

// SELECT | READ
const requestLanguageList = async () => {
    const query = `SELECT * FROM language`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `language not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLanguage = async (language) => {
    const lang = language.toUpperCase();
    const errorData = { code: 404, result: `language ${lang} not found` };
    if (lang !== `RU` && lang !== `EN`) return errorData;
    const query = `SELECT langSelector, lang${lang} as lang FROM language`;
    try {
        const data = await requestDB(query);
        const formatedData = {};
        data.forEach(({ langSelector, lang }) => {
            formatedData[langSelector] = lang;
        });
        return (data.length) ? formatedData : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestSelectors = async () => {
    const query = `SELECT langSelector FROM language`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `selectors not found` };
        const formatData = data.map(({ langSelector }) => langSelector);
        return (data.length) ? formatData : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestSelectorLanguage = async (langSelector) => {
    const query = `
        SELECT langRU, langEN FROM language 
        WHERE langSelector = '${langSelector}'
    `;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `selector not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateLanguage = async (langSelector, params) => {
    const errorMessage = { code: 404, error: `language not found` };
    if (!langSelector) return errorMessage;
    const { langRU, langEN } = params;
    const query = `
        UPDATE language SET 
            langRU = '${langRU}', langEN = '${langEN}'
        WHERE langSelector = '${langSelector}'`;
    try {
        const response = await requestDB(query);
        const { changedRows, message } = response;
        return {
            code: (changedRows) ? 200 : 0,
            result: (changedRows) ? `language updated` : message
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestLanguageList, requestLanguage, requestSelectors, 
    requestSelectorLanguage, updateLanguage
};