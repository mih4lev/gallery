const fs = require(`fs`);
const { requestDB } = require(`../models/db.model`);
const { 
    photosArray, colorsArray, genreArray, techniqueArray 
} = require(`./pictures-data.model`);
const { savePhoto, saveThumb } = require(`./utils.model`);

// INSERT | CREATE
const saveAuthor = async (params) => {
    const {
        authorLink, authorRU, authorEN,
        authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
    } = params;
    const query = `
        INSERT INTO authors (
            authorLink, authorRU, authorEN, authorAboutRU, 
            authorAboutEN, authorCityRU, authorCityEN
        ) VALUES (
            '${authorLink}', '${authorRU}', '${authorEN}',
            '${authorAboutRU}', '${authorAboutEN}', 
            '${authorCityRU}', '${authorCityEN}' 
        )`;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `author added` : `author add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestAuthorList = async () => {
    const query = `SELECT * FROM authors`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `authors not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestAuthor = async (authorID) => {
    try {
        const authorQuery = `SELECT * FROM authors WHERE authorID = ${authorID}`;
        const rewardsQuery = `
            SELECT 
                rewardID, rewardYearRU, rewardYearEN, rewardRU, rewardEN
            FROM rewards WHERE authorID = ${authorID}
            ORDER BY rewardPlace`;
        const exhibitionsQuery = `
            SELECT 
                exhibitionID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
            FROM exhibitions WHERE authorID = ${authorID}`;
        const educationsQuery = `
            SELECT 
                educationID, educationYearRU, educationYearEN, educationRU, educationEN
            FROM educations WHERE authorID = ${authorID}`;
        const { 0: authorData } = await requestDB(authorQuery);
        if (!authorData.authorID) return { code: 404, error: `author ${authorID} not found` };
        return Object.assign(authorData, {
            rewards: await requestDB(rewardsQuery),
            exhibitions: await requestDB(exhibitionsQuery),
            educations: await requestDB(educationsQuery)
        });
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLanguageAuthors = async (language, limit = 100) => {
    try {
        const lang = language.toUpperCase();
        const authorQuery = `
            SELECT 
                authorID, authorLink, author${lang} as author, authorPhoto, 
                authorAbout${lang} as authorAbout, 
                authorCity${lang} as authorCity 
            FROM authors LIMIT ${limit}`;
        const result = await requestDB(authorQuery);
        if (!result.length) return { code: 404, error: `authors not found` };
        const authorData = [];
        for (const author of result) {
            const { authorID } = author;
            const pictureQuery = `
                SELECT pictureID, picture${lang} as picture, picturePlace
                FROM pictures WHERE authorID = ${authorID}
                ORDER BY picturePlace LIMIT 3`;
            const pictures = await requestDB(pictureQuery);
            for (const picture of pictures) {
                const { pictureID } = picture;
                const photosQuery = `SELECT photoLink FROM photos WHERE pictureID = '${pictureID}'`;
                const result = await requestDB(photosQuery);
                picture.hasPhoto = !!(result[0]);
                if (picture.hasPhoto) {
                    picture.photoLink = result[0].photoLink;
                }
            }
            authorData.push(Object.assign(
                author,
                { pictures: pictures }
            ));
        }
        return authorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestLanguageAuthor = async (authorID, language) => {
    try {
        const lang = language.toUpperCase();
        const authorQuery = `
            SELECT 
                authorID, authorLink, author${lang} as author, authorPhoto, 
                authorAbout${lang} as authorAbout, 
                authorCity${lang} as authorCity 
            FROM authors WHERE authorID = ${authorID}`;
        const rewardsQuery = `
            SELECT 
                rewardID, rewardYear${lang} as rewardYear, 
                reward${lang} as reward 
            FROM rewards WHERE authorID = ${authorID}
            ORDER BY rewardPlace`;
        const exhibitionsQuery = `
            SELECT 
                exhibitionID, exhibitionYear${lang} as exhibitionYear, 
                exhibition${lang} as exhibition 
            FROM exhibitions WHERE authorID = ${authorID}
            ORDER BY exhibitionPlace`;
        const educationsQuery = `
            SELECT 
                educationID, educationYear${lang} as educationYear, 
                education${lang} as education 
            FROM educations WHERE authorID = ${authorID}
            ORDER BY educationPlace`;
        const { 0: authorData } = await requestDB(authorQuery);
        if (!authorData.authorID) return { code: 404, error: `author ${authorID} not found` };
        return Object.assign(authorData, {
            rewards: await requestDB(rewardsQuery),
            exhibitions: await requestDB(exhibitionsQuery),
            educations: await requestDB(educationsQuery)
        });
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestAuthorRewards = async (authorID) => {
    const query = `
        SELECT 
            rewardID, rewardYearRU, rewardYearEN, rewardRU, rewardEN
        FROM rewards WHERE authorID = ${authorID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `authorID ${authorID} rewards not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestAuthorEducations = async (authorID) => {
    const query = `
        SELECT 
            educationID, educationYearRU, educationYearEN, educationRU, educationEN
        FROM educations WHERE authorID = ${authorID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `authorID ${authorID} educations not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestAuthorExhibitions = async (authorID) => {
    const query = `
        SELECT 
            exhibitionID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
        FROM exhibitions WHERE authorID = ${authorID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `authorID ${authorID} exhibitions not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestAuthorPictures = async (authorID) => {
    try {
        const query = `
            SELECT pictureID, pictureRU, pictureEN, pictureSizeWidth, pictureSizeHeight, 
            pictureOrientation, picturePrice, picturePriceSale, pictureAboutRU, pictureAboutEN,
            picturePosition, picturePhoto
            FROM pictures WHERE authorID = '${authorID}'
        `;
        const data = await requestDB(query);
        if (!data.length) return { code: 404, result: `pictures not found` };
        for (const picture of data) {
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

// UPDATE
const updateAuthor = async (authorID, params) => {
    const {
        authorRU, authorEN, authorLink,
        authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
    } = params;
    const query = `
        UPDATE authors SET 
            authorRU = '${authorRU}', authorEN = '${authorEN}', authorLink = '${authorLink}', 
            authorAboutRU = '${authorAboutRU}', authorAboutEN = '${authorAboutEN}', 
            authorCityRU = '${authorCityRU}', authorCityEN = '${authorCityEN}' 
        WHERE authorID = ${authorID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `author updated` : `author not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const deletePreviousPhoto = async (authorID) => {
    const selectQuery = `SELECT authorPhoto FROM authors WHERE authorID = ${authorID}`;
    const { 0: { authorPhoto: filename }} = await requestDB(selectQuery);
    if (filename === `NULL` || filename === null) return false;
    fs.unlinkSync(`public/photos/authors/${filename}.png`);
    fs.unlinkSync(`public/photos/authors/${filename}.webp`);
    fs.unlinkSync(`public/photos/authors/thumbs/${filename}_55x55.png`);
    fs.unlinkSync(`public/photos/authors/thumbs/${filename}_55x55.webp`);
    fs.unlinkSync(`public/photos/authors/thumbs/${filename}_20x20.png`);
    fs.unlinkSync(`public/photos/authors/thumbs/${filename}_20x20.webp`);
};
const updateAuthorPhoto = async (authorID, file) => {
    try {
        const { filename } = file;
        const fileDir = `public/photos/authors`;
        await deletePreviousPhoto(authorID);
        await savePhoto(fileDir, file, 216, 216);
        await saveThumb(fileDir, file, 55, 55);
        await saveThumb(fileDir, file, 20, 20);
        // delete temp multer file
        fs.unlinkSync(`public/photos/${filename}`);
        const query = `
            UPDATE authors SET authorPhoto = '${filename}'
            WHERE authorID = ${authorID}`;
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? filename : `author not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteAuthor = async (authorID) => {
    const query = `DELETE FROM authors WHERE authorID = ${authorID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `author deleted` : `author not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestAuthorList, requestAuthor, saveAuthor,
    updateAuthor, deleteAuthor, requestAuthorRewards,
    requestAuthorEducations, requestAuthorExhibitions,
    requestAuthorPictures, requestLanguageAuthor,
    requestLanguageAuthors, updateAuthorPhoto
};