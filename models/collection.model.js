const { requestDB } = require(`../models/db.model`);

// SELECT | READ
const collectionList = async () => {
    const query = `SELECT * FROM collection`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `pictures not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLangCollectionList = async (lang) => {
    const query = `
        SELECT 
            pictureID, pictureLink, 
            picture${lang} as picture, picturePhoto
        FROM collection`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `pictures not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestCollectionPicture = async (pictureID) => {
    const query = `SELECT * FROM collection WHERE pictureID = ${pictureID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `picture ${pictureID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updatePicture = async (pictureID, params) => {
    const { pictureLink, picturePhoto, pictureRU, pictureEN } = params;
    const query = `
        UPDATE pictures SET 
            pictureLink = '${pictureLink}', picturePhoto = '${picturePhoto}', 
            pictureRU = '${pictureRU}', pictureEN = '${pictureEN}'
        WHERE pictureID = ${pictureID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `picture updated` : `picture not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    collectionList, requestLangCollectionList,
    requestCollectionPicture, updatePicture
};