const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveEducation = async (params) => {
    const {
        authorID, educationYearRU, educationYearEN, educationRU, educationEN
    } = params;
    const query = `
        INSERT INTO educations (
            authorID, educationYearRU, educationYearEN, educationRU, educationEN
        ) VALUES (
            '${authorID}', '${educationYearRU}', '${educationYearEN}', 
            '${educationRU}', '${educationEN}'
        )`;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `education added` : `education add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestEducationList = async () => {
    const query = `SELECT * FROM educations`;
    return await requestDB(query);
};

// UPDATE
const updateEducation = async (educationID, params) => {
    const {
        educationYearRU, educationYearEN, educationRU, educationEN
    } = params;
    const query = `
        UPDATE educations SET 
            educationYearRU = '${educationYearRU}', educationYearEN = '${educationYearEN}', 
            educationRU = '${educationRU}', educationEN = '${educationEN}' 
        WHERE educationID = ${educationID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `education updated` : `education not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteEducation = async (educationID) => {
    const query = `DELETE FROM educations WHERE educationID = ${educationID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `education deleted` : `education not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = { requestEducationList, saveEducation, updateEducation, deleteEducation };