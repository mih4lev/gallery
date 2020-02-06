const fs = require(`fs`);
const { requestDB } = require(`../models/db.model`);
const { savePhoto } = require(`./utils.model`);

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
const deletePreviousPhoto = async (pictureID) => {
    const selectQuery = `SELECT picturePhoto FROM collection WHERE pictureID = ${pictureID}`;
    const { 0: { picturePhoto: filename }} = await requestDB(selectQuery);
    if (filename === `NULL` || filename === null) return false;
    fs.unlinkSync(`public/photos/collection/${filename}.png`);
    fs.unlinkSync(`public/photos/collection/${filename}.webp`);
};
const sizeMap = {
    'collection1': { width: 319, height: 515 },
    'collection2': { width: 358, height: 327 },
    'collection3': { width: 365, height: 274 },
    'collection4': { width: 687, height: 515 },
    'collection5': { width: 357, height: 535 },
    'collection6': { width: 358, height: 447 },
    'collection7': { width: 338, height: 391 }
};
const updateCollectionPhoto = async (pictureID, file) => {
    try {
        const { filename } = file;
        const fileDir = `public/photos/collection`;
        await deletePreviousPhoto(pictureID);
        const fileName = `collection${pictureID}`;
        await savePhoto(fileDir, file, sizeMap[fileName].width, sizeMap[fileName].height);
        // delete temp multer file
        fs.unlinkSync(`public/photos/${filename}`);
        const query = `
            UPDATE collection SET picturePhoto = '${filename}'
            WHERE pictureID = ${pictureID}`;
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? filename : `picture not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};


module.exports = {
    collectionList, requestLangCollectionList,
    requestCollectionPicture, updatePicture,
    updateCollectionPhoto
};