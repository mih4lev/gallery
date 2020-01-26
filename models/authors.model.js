const { requestDB } = require(`../models/db.model`);
const { 
    authorData, photosArray, colorsArray, genreArray, techniqueArray 
} = require(`./pictures-data.model`);

// INSERT | CREATE
const saveAuthor = async (params) => {
    const {
        authorLink, authorRU, authorEN, authorPhoto,
        authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
    } = params;
    const query = `
        INSERT INTO authors (
            authorLink, authorRU, authorEN, authorPhoto,
            authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
        ) VALUES (
            '${authorLink}', '${authorRU}', '${authorEN}', '${authorPhoto}', 
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
    const authorQuery = `SELECT * FROM authors WHERE authorID = ${authorID}`;
    const rewardsQuery = `
        SELECT 
            rewardID, rewardYearRU, rewardYearEN, rewardRU, rewardEN
        FROM rewards WHERE authorID = ${authorID}`;
    const exhibitionsQuery = `
        SELECT 
            exhibitionID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
        FROM exhibitions WHERE authorID = ${authorID}`;
    const educationsQuery = `
        SELECT 
            educationID, educationYearRU, educationYearEN, educationRU, educationEN
        FROM educations WHERE authorID = ${authorID}`;
    const { 0: authorData } = await requestDB(authorQuery);
    return Object.assign(authorData, {
        rewards: await requestDB(rewardsQuery),
        exhibitions: await requestDB(exhibitionsQuery),
        educations: await requestDB(educationsQuery)
    });
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
        authorRU, authorEN, authorPhoto, authorLink,
        authorAboutRU, authorAboutEN, authorCityRU, authorCityEN
    } = params;
    const query = `
        UPDATE authors SET 
            authorRU = '${authorRU}', authorEN = '${authorEN}', 
            authorLink = '${authorLink}', authorPhoto = '${authorPhoto}', 
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
    requestAuthorPictures
};