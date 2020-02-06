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

const updatePlaces = async (picturePlace) => {
    try {
        const placeQuery = `
            SELECT pictureID FROM pictures 
            WHERE picturePlace >= ${picturePlace} ORDER BY picturePlace
        `;
        const changeFields = await requestDB(placeQuery);
        let updatedPlace = Number(picturePlace) + 1;
        for (const { pictureID: changeID } of changeFields) {
            const updateQuery = `
                UPDATE pictures SET picturePlace = ${updatedPlace++}
                WHERE pictureID = ${changeID};
            `;
            await requestDB(updateQuery);
        }
    } catch (error) {
        return error;
    }
};

// INSERT | CREATE
const savePicture = async (params) => {
    const {
        authorID, pictureRU, pictureEN, picturePlace, pictureSizeWidth,
        pictureSizeHeight, picturePrice, picturePriceSale,
        pictureAboutRU, pictureAboutEN, pictureOrientation,
        genresID, techniquesID, colorsID
    } = params;
    const countQuery = `SELECT COUNT(exhibitionID) as count FROM exhibitions`;
    const { 0: { count }} = await requestDB(countQuery);
    let setPlace = count + 1;
    if (picturePlace) {
        setPlace = picturePlace;
        await updatePlaces(picturePlace);
    }
    const query = `
        INSERT INTO pictures (
            pictureRU, pictureEN, picturePlace, 
            picturePrice, picturePriceSale, 
            pictureSizeWidth, pictureSizeHeight, 
            pictureAboutRU, pictureAboutEN, 
            authorID, pictureOrientation
        ) VALUES (
            '${pictureRU}', '${pictureEN}', '${setPlace}', 
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
                authors.authorPhoto as authorPhoto,
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
const requestLanguagePictures = async (language, limit = 1000) => {
    try {
        const lang = language.toUpperCase();
        const query = `
            SELECT 
                pictures.pictureID as pictureID,
                pictures.picture${lang} as picture, authors.authorID as authorID,
                authors.authorLink as authorLink, authors.author${lang} as author,
                authors.authorPhoto as authorPhoto,
                pictures.pictureSizeWidth as pictureSizeWidth,
                pictures.pictureSizeHeight as pictureSizeHeight, 
                pictures.pictureOrientation as pictureOrientation,
                pictures.picturePrice as picturePrice, 
                pictures.picturePriceSale as picturePriceSale, 
                pictures.pictureAbout${lang} as pictureAbout
            FROM pictures
            INNER JOIN authors ON pictures.authorID = authors.authorID
            ORDER BY pictures.picturePlace
            LIMIT ${limit}
        `;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `pictures not found` };
        for (const picture of data) {
            await Promise.all([
                colorsArray(picture, lang),
                photosArray(picture, lang),
                genreArray(picture, lang),
                techniqueArray(picture, lang),
                photosArray(picture, lang)
            ]);
            picture.langPrice = await changeCurrency(picture.picturePrice, lang);
        }
        return data;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLanguageAuthorPictures = async (authorID, language, limit = 1000, exceptID = false) => {
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
            WHERE pictures.authorID = ${authorID} 
            ${(exceptID) ? `AND pictureID not like '${exceptID}'` : ``}
            ORDER BY pictures.picturePlace 
            LIMIT ${limit}
        `;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `pictures not found` };
        for (const picture of data) {
            await Promise.all([
                colorsArray(picture, lang),
                photosArray(picture, lang),
                genreArray(picture, lang),
                techniqueArray(picture, lang),
                photosArray(picture, lang)
            ]);
            picture.langPrice = await changeCurrency(picture.picturePrice, lang);
        }
        return data;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLanguageFilters = async (language = `ru`) => {
    try {
        const lang = language.toUpperCase();
        const picturesQuery = `
            SELECT 
                MIN(picturePrice) as minPrice, 
                MAX(picturePrice) as maxPrice,
                MIN(pictureSizeWidth) as minWidth,
                MAX(pictureSizeWidth) as maxWidth,
                MIN(pictureSizeHeight) as minHeight,
                MAX(pictureSizeHeight) as maxHeight
            FROM pictures`;
        const colorsQuery = `
            SELECT 
                colors.colorID, 
                colors.colorName, 
                colors.colorHEX, 
                colors.color${lang} as color,
                COUNT(colors.colorID) as count
            FROM colorList 
            INNER JOIN colors ON colors.colorID = colorList.colorID
            GROUP BY colors.colorID`;
        const genresQuery = `
            SELECT 
                genres.genreID, 
                genres.genre${lang} as genre,
                COUNT(genres.genreID) as count
            FROM genreList
            INNER JOIN genres ON genres.genreID = genreList.genreID
            GROUP BY genres.genreID`;
        const techniquesQuery = `
            SELECT 
                techniques.techniqueID, 
                techniques.technique${lang} as technique, 
                COUNT(techniques.techniqueID) as count
            FROM techniqueList
            INNER JOIN techniques ON techniques.techniqueID = techniqueList.techniqueID
            GROUP BY techniques.techniqueID`;
        const authorsQuery = `
            SELECT 
                authors.authorID, 
                authors.author${lang} as author, 
                authors.authorPhoto,
                COUNT(pictures.authorID) as count
            FROM pictures
            INNER JOIN authors ON pictures.authorID = authors.authorID
            GROUP BY authors.authorID
        `;
        const orientationsQuery = `
            SELECT 
                pictures.pictureOrientation,
                COUNT(pictures.pictureOrientation) as count
            FROM pictures
            GROUP BY pictures.pictureOrientation`;
        const filters = await Promise.all([
            requestDB(picturesQuery),
            requestDB(colorsQuery),
            requestDB(genresQuery),
            requestDB(techniquesQuery),
            requestDB(authorsQuery),
            requestDB(orientationsQuery)
        ]);
        const picturesData = filters[0][0];
        picturesData.langMinPrice = await changeCurrency(picturesData.minPrice, lang);
        picturesData.langMaxPrice = await changeCurrency(picturesData.maxPrice, lang);
        return Object.assign(
            picturesData,
            { colors: filters[1] },
            { genres: filters[2] },
            { techniques: filters[3] },
            { authors: filters[4] },
            { orientations: filters[5] }
        );
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
        pictureOrientation, genresID, techniquesID, colorsID
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
        await updatePlaces(picturePlace);
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
    requestLanguagePictures, requestLanguageFilters,
    requestLanguageAuthorPictures, savePicture, updatePicture,
    addPicturePhoto, deletePicture, deletePicturePhoto
};