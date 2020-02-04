const fs = require(`fs`);
const { changeCurrency } = require(`./currency.model`);
const { requestDB } = require(`./db.model`);
const {
    authorData, photosArray, colorsArray,
    genreArray, techniqueArray,
    addGenres, editGenres, deleteGenres,
    addTechniques, editTechniques, deleteTechniques,
    addColors, editColors, deleteColors
} = require(`./pictures-data.model`);
const { savePhoto, saveThumb, saveOriginal, saveOriginalThumb } = require(`./utils.model`);

// INSERT | CREATE
const savePicture = async (params) => {
    const {
        authorID, pictureRU, pictureEN, picturePlace, pictureSizeWidth,
        pictureSizeHeight, picturePrice, picturePriceSale,
        pictureAboutRU, pictureAboutEN, pictureOrientation,
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
            '${authorID[0]}', '${pictureOrientation}'
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
const addPicturePhoto = async (pictureID, file) => {
    try {
        const { filename } = file;
        const fileDir = `public/photos/pictures`;
        await saveOriginal(fileDir, file);
        await saveOriginalThumb(fileDir, file, 690);
        await savePhoto(fileDir, file, 346);
        await saveThumb(fileDir, file, 194, 194);
        await saveThumb(fileDir, file, 56, 56);
        // delete temp multer file
        fs.unlinkSync(`public/photos/${filename}`);
        const query = `
            INSERT INTO photos ( pictureID, photoLink )
            VALUES ( '${pictureID}', '${filename}' )`;
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `photo added` : `picture add error`,
            insertID: insertId
        };
    } catch (event) {
        const { sqlMessage } = event;
        console.log(event);
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
        await photosArray(pictureData, lang);
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
        pictureOrientation,
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
            pictureOrientation = '${pictureOrientation}', 
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
const deletePhotos = async (photoID) => {
    try {
        const filenameQuery = `SELECT photoLink FROM photos WHERE photoID = '${photoID}'`;
        const { 0: { photoLink }} = await requestDB(filenameQuery);
        if (photoLink === `NULL` || photoLink === null) return false;
        fs.unlinkSync(`public/photos/pictures/${photoLink}.png`);
        fs.unlinkSync(`public/photos/pictures/${photoLink}.webp`);
        fs.unlinkSync(`public/photos/pictures/original/${photoLink}.webp`);
        fs.unlinkSync(`public/photos/pictures/original/${photoLink}.jpg`);
        fs.unlinkSync(`public/photos/pictures/original/${photoLink}_preview.webp`);
        fs.unlinkSync(`public/photos/pictures/original/${photoLink}_preview.jpg`);
        fs.unlinkSync(`public/photos/pictures/thumbs/${photoLink}_194x194.png`);
        fs.unlinkSync(`public/photos/pictures/thumbs/${photoLink}_194x194.webp`);
        fs.unlinkSync(`public/photos/pictures/thumbs/${photoLink}_56x56.png`);
        fs.unlinkSync(`public/photos/pictures/thumbs/${photoLink}_56x56.webp`);
    } catch (error) {
        console.log(error);
    }
};
const deletePicturePhoto = async (photoID) => {
    const query = `DELETE FROM photos WHERE photoID = ${photoID}`;
    try {
        await deletePhotos(photoID);
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `photo deleted` : `photo not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestPictureList, requestPicture, requestLanguagePicture,
    savePicture, updatePicture, addPicturePhoto, deletePicture,
    deletePicturePhoto
};