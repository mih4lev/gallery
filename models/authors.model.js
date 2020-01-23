const { requestDB } = require(`../models/db.model`);

const requestAuthorList = async () => {
    const query = `SELECT * FROM authors`;
    return await requestDB(query);
};

const requestAuthor = async (authorID) => {
    const authorQuery = `SELECT * FROM authors WHERE authorID = ${authorID}`;
    const rewardsQuery = `SELECT * FROM rewards WHERE authorID = ${authorID}`;
    const exhibitionsQuery = `SELECT * FROM exhibitions WHERE authorID = ${authorID}`;
    const educationsQuery = `SELECT * FROM educations WHERE authorID = ${authorID}`;
    const { 0: authorData } = await requestDB(authorQuery);
    return Object.assign(authorData, {
        rewards: await requestDB(rewardsQuery),
        exhibitions: await requestDB(exhibitionsQuery),
        educations: await requestDB(educationsQuery)
    });
};

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

module.exports = { requestAuthorList, requestAuthor, saveAuthor, updateAuthor, deleteAuthor };