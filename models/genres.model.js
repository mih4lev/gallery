const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveGenre = async (params) => {
    const { genreRU, genreEN } = params;
    const query = `
        INSERT INTO genres ( genreRU, genreEN ) VALUES ( '${genreRU}', '${genreEN}' )
    `;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `genre added` : `genre add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestGenreList = async () => {
    const query = `SELECT * FROM genres`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `colors not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestGenre = async (genreID) => {
    const query = `SELECT * FROM genres WHERE genreID = ${genreID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `genre ${genreID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateGenre = async (genreID, params) => {
    const { genreRU, genreEN } = params;
    const query = `
        UPDATE genres SET 
            genreRU = '${genreRU}', genreEN = '${genreEN}'
        WHERE genreID = ${genreID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `genre updated` : `genre not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteGenre = async (genreID) => {
    const query = `DELETE FROM genres WHERE genreID = ${genreID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `genre deleted` : `genre not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    saveGenre, requestGenreList, requestGenre,
    updateGenre, deleteGenre
};