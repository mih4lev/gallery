const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveExhibition = async (params) => {
    const {
        authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
    } = params;
    const query = `
        INSERT INTO exhibitions (
            authorID, exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
        ) VALUES (
            '${authorID}', '${exhibitionYearRU}', '${exhibitionYearEN}', 
            '${exhibitionRU}', '${exhibitionEN}'
        )`;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `exhibition added` : `exhibition add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestExhibitionList = async () => {
    const query = `SELECT * FROM exhibitions`;
    return await requestDB(query);
};

// UPDATE
const updateExhibition = async (exhibitionID, params) => {
    const {
        exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
    } = params;
    const query = `
        UPDATE exhibitions SET 
            exhibitionYearRU = '${exhibitionYearRU}', exhibitionYearEN = '${exhibitionYearEN}', 
            exhibitionRU = '${exhibitionRU}', exhibitionEN = '${exhibitionEN}' 
        WHERE exhibitionID = ${exhibitionID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `exhibition updated` : `exhibition not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteExhibition = async (exhibitionID) => {
    const query = `DELETE FROM exhibitions WHERE exhibitionID = ${exhibitionID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `exhibition deleted` : `exhibition not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = { requestExhibitionList, saveExhibition, updateExhibition, deleteExhibition };