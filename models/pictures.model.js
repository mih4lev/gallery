const { changeCurrency } = require(`./currency.model`);
const { requestDB } = require(`./db.model`);
const {
    authorData, photosArray, colorsArray,
    genreArray, techniqueArray,
    addGenres, editGenres, deleteGenres,
    addTechniques, editTechniques, deleteTechniques,
    addColors, editColors, deleteColors
} = require(`./pictures-data.model`);

// INSERT | CREATE
const savePicture = async (params) => {
    const {
        authorID, pictureRU, pictureEN, picturePlace, pictureSizeWidth,
        pictureSizeHeight, picturePrice, picturePriceSale,
        pictureAboutRU, pictureAboutEN,
        genresID, techniquesID, colorsID
    } = params;
    const query = `
        INSERT INTO pictures (
            pictureRU, pictureEN, picturePlace, 
            picturePrice, picturePriceSale,
            pictureSizeWidth, pictureSizeHeight, 
            pictureAboutRU, pictureAboutEN, 
            authorID, pictureOrientation
        ) VALUES (
            '${pictureRU}', '${pictureEN}', '${picturePlace}', 
            '${picturePrice}', '${(picturePriceSale) ? picturePriceSale : 0}', 
            '${pictureSizeWidth}', '${pictureSizeHeight}', 
            '${pictureAboutRU}', '${pictureAboutEN}', 
            '${authorID[0]}', 'width'
        )`;
    try {
        const { insertId } = await requestDB(query);
        await addGenres(insertId, genresID);
        await addTechniques(insertId, techniquesID);
        await addColors(insertId, colorsID);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `picture added` : `picture add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

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
const requestLanguagePicture = async (pictureID, language) => {
    try {
        const lang = language.toUpperCase();
        const query = `
            SELECT 
                pictures.pictureID as pictureID,
                pictures.picture${lang} as picture, authors.authorID as authorID,
                authors.authorLink as authorLink, authors.author${lang} as author,
                pictures.pictureSizeWidth as pictureSizeWidth,
                pictures.pictureSizeHeight as pictureSizeHeight, 
                pictures.pictureOrientation as pictureOrientation,
                pictures.picturePrice as picturePrice, 
                pictures.picturePriceSale as picturePriceSale, 
                pictures.pictureAbout${lang} as pictureAbout
            FROM pictures
            INNER JOIN authors ON pictures.authorID = authors.authorID
            WHERE pictures.pictureID = ${pictureID}
        `;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `picture ${pictureID} not found` };
        const { 0: pictureData, 0: { picturePrice }} = data;
        await photosArray(pictureData, lang);
        await genreArray(pictureData, lang);
        await techniqueArray(pictureData, lang);
        pictureData.langPrice = await changeCurrency(picturePrice, lang);
        return pictureData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updatePicture = async (pictureID, params) => {
    const {
        pictureRU, pictureEN, picturePlace, pictureSizeWidth,
        pictureSizeHeight, picturePrice, picturePriceSale,
        pictureAboutRU, pictureAboutEN, authorID,
        genresID, techniquesID, colorsID
    } = params;
    const query = `
        UPDATE pictures SET 
            pictureRU = '${pictureRU}', 
            pictureEN = '${pictureEN}', 
            picturePlace = '${picturePlace}', 
            pictureSizeWidth = '${pictureSizeWidth}', 
            pictureSizeHeight = '${pictureSizeHeight}', 
            picturePrice = '${picturePrice}', 
            picturePriceSale = '${(picturePriceSale) ? picturePriceSale : 0}', 
            pictureAboutRU = '${pictureAboutRU}', 
            pictureAboutEN = '${pictureAboutEN}', 
            authorID = '${authorID[0]}' 
        WHERE pictureID = ${pictureID}`;
    try {
        await requestDB(query);
        await editGenres(pictureID, genresID);
        await editTechniques(pictureID, techniquesID);
        await editColors(pictureID, colorsID);
        return {
            code: 200,
            result: `picture ${pictureID} updated`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deletePicture = async (pictureID) => {
    const query = `DELETE FROM pictures WHERE pictureID = ${pictureID}`;
    try {
        const { affectedRows } = await requestDB(query);
        await deleteGenres(pictureID);
        await deleteTechniques(pictureID);
        await deleteColors(pictureID);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `picture deleted` : `picture not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestPictureList, requestPicture, requestLanguagePicture,
    savePicture, updatePicture, deletePicture
};