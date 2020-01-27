const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveEducation = async (authorID, params) => {
    const {
        educationYearRU, educationYearEN, educationRU, educationEN
    } = params;
    const countQuery = `SELECT COUNT(educationID) as count FROM educations`;
    const { 0: { count }} = await requestDB(countQuery);
    const query = `
        INSERT INTO educations (
            authorID, educationYearRU, educationYearEN, 
            educationRU, educationEN, educationPlace
        ) VALUES (
            '${authorID}', '${educationYearRU}', '${educationYearEN}', 
            '${educationRU}', '${educationEN}', ${count + 1}
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
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `educations not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestEducation = async (educationID) => {
    const query = `
        SELECT 
            educationYearRU, educationYearEN, educationRU, 
            educationEN, educationPlace 
        FROM educations WHERE educationID = '${educationID}'
    `;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `education ${educationID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateEducation = async (educationID, params) => {
    const errorMessage = { code: 404, error: `education not found` };
    if (!educationID) return errorMessage;
    const {
        educationYearRU, educationYearEN, educationRU, educationEN
    } = params;
    const query = `
        UPDATE educations SET 
            educationYearRU = '${educationYearRU}', educationYearEN = '${educationYearEN}', 
            educationRU = '${educationRU}', educationEN = '${educationEN}' 
        WHERE educationID = ${educationID}`;
    try {
        const response = await requestDB(query);
        const { changedRows, message } = response;
        return {
            code: (changedRows) ? 200 : 0,
            result: (changedRows) ? `education updated` : message
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

module.exports = {
    requestEducation, requestEducationList,
    saveEducation, updateEducation, deleteEducation
};