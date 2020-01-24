const { requestDB } = require(`../models/db.model`);

// SELECT | READ
const requestPageList = async () => {
    const query = `SELECT * FROM pages`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `pages not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestPage = async (pageLink) => {
    const query = `SELECT * FROM pages WHERE pageLink = '${pageLink}'`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `page ${pageLink} not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updatePage = async (pageID, params) => {
    const {
        titleRU, titleEN, metaDescriptionRU, metaDescriptionEN,
        metaKeywordsRU, metaKeywordsEN
    } = params;
    const query = `
        UPDATE pages SET 
            titleRU = '${titleRU}', 
            titleEN = '${titleEN}', 
            metaDescriptionRU = '${metaDescriptionRU}', 
            metaDescriptionEN = '${metaDescriptionEN}', 
            metaKeywordsRU = '${metaKeywordsRU}', 
            metaKeywordsEN = '${metaKeywordsEN}'
        WHERE pageID = ${pageID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `page updated` : `page not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};


module.exports = { requestPageList, requestPage, updatePage };