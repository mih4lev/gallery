const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveExhibition = async (authorID, params) => {
    const {
        exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
    } = params;
    const countQuery = `SELECT COUNT(exhibitionID) as count FROM exhibitions`;
    const { 0: { count }} = await requestDB(countQuery);
    const query = `
        INSERT INTO exhibitions (
            authorID, exhibitionYearRU, exhibitionYearEN, 
            exhibitionRU, exhibitionEN, exhibitionPlace
        ) VALUES (
            '${authorID}', '${exhibitionYearRU}', '${exhibitionYearEN}', 
            '${exhibitionRU}', '${exhibitionEN}', ${count + 1}
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
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `exhibitions not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestExhibition = async (exhibitionID) => {
    const query = `
        SELECT 
            exhibitionYearRU, exhibitionYearEN, exhibitionRU, 
            exhibitionEN, exhibitionPlace
        FROM exhibitions WHERE exhibitionID = '${exhibitionID}'
    `;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `exhibition ${exhibitionID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateExhibition = async (exhibitionID, params) => {
    const errorMessage = { code: 404, error: `exhibition not found` };
    if (!exhibitionID) return errorMessage;
    const {
        exhibitionYearRU, exhibitionYearEN, exhibitionRU, exhibitionEN
    } = params;
    const query = `
        UPDATE exhibitions SET 
            exhibitionYearRU = '${exhibitionYearRU}', exhibitionYearEN = '${exhibitionYearEN}', 
            exhibitionRU = '${exhibitionRU}', exhibitionEN = '${exhibitionEN}' 
        WHERE exhibitionID = ${exhibitionID}`;
    try {
        const response = await requestDB(query);
        const { changedRows, message } = response;
        return {
            code: (changedRows) ? 200 : 0,
            result: (changedRows) ? `exhibition updated` : message
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteExhibition = async (exhibitionID) => {
    try {
        const placeQuery = `
            SELECT exhibitionPlace 
            FROM exhibitions WHERE exhibitionID = ${exhibitionID}
        `;
        const placeResult = await requestDB(placeQuery);
        if (!placeResult.length) return { code: 404, error: `exhibition not found`};
        let { 0: { exhibitionPlace }} = placeResult;
        const query = `DELETE FROM exhibitions WHERE exhibitionID = ${exhibitionID}`;
        const { affectedRows } = await requestDB(query);
        if (!affectedRows) return { code: 0, error: `exhibition delete error` };
        const deletedQuery = `
            SELECT exhibitionID 
            FROM exhibitions WHERE exhibitionPlace > ${exhibitionPlace}
        `;
        const changeFields = await requestDB(deletedQuery);
        for (const { exhibitionID: changeID } of changeFields) {
            const updateQuery = `
                UPDATE exhibitions SET exhibitionPlace = ${exhibitionPlace++}
                WHERE exhibitionID = ${changeID};
            `;
            await requestDB(updateQuery);
        }
        return { code: 200, result: `exhibition ${exhibitionID} deleted` }
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestExhibition, requestExhibitionList,
    saveExhibition, updateExhibition, deleteExhibition
};