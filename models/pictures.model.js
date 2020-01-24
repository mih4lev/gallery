const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE


// SELECT | READ
const photosArray = async (picture) => {
    const { pictureID } = picture;
    const photosQuery = `
        SELECT 
            photoID, photoNameRU, photoNameEN, photoLink 
        FROM photos WHERE pictureID = ${pictureID}
    `;
    picture.photos = await requestDB(photosQuery);
};
const colorsArray = async (picture) => {
    const { pictureID } = picture;
    const colorsQuery = `
        SELECT pictureID, colorID
        FROM colorList WHERE pictureID = ${pictureID}
    `;
    picture.colors = await requestDB(colorsQuery);
};
const requestPictureList = async () => {
    try {
        const query = `SELECT * FROM pictures`;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `pictures not found` };
        for (const picture of data) {
            await photosArray(picture);
            await colorsArray(picture);
        }
        return data;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE


// DELETE
const deletePicture = async (pictureID) => {
    const query = `DELETE FROM pictures WHERE pictureID = ${pictureID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `picture deleted` : `picture not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestPictureList, deletePicture
};