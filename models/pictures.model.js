const { requestDB } = require(`./db.model`);
const { authorData, photosArray, colorsArray, genreArray, techniqueArray } = require(`./pictures-data.model`);

// INSERT | CREATE


// SELECT | READ
const requestPictureList = async () => {
    try {
        const query = `SELECT * FROM pictures`;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `pictures not found` };
        for (const picture of data) {
            await authorData(picture);
            await photosArray(picture);
            await colorsArray(picture);
            await genreArray(picture);
            await techniqueArray(picture);
        }
        return data;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestPicture = async (pictureID) => {
    try {
        const query = `SELECT * FROM pictures WHERE pictureID = '${pictureID}'`;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `pictures not found` };
        await authorData(data[0]);
        await photosArray(data[0]);
        await colorsArray(data[0]);
        await genreArray(data[0]);
        await techniqueArray(data[0]);
        return data[0];
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
    requestPictureList, requestPicture, deletePicture
};