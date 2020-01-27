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
const moveEducation = async (educationMasterID, educationSlaveID) => {
    try {
        const masterQuery = `
            SELECT educationPlace 
            FROM educations WHERE educationID = ${educationMasterID}
        `;
        const masterResult = await requestDB(masterQuery);
        const slaveQuery = `
            SELECT educationPlace 
            FROM educations WHERE educationID = ${educationSlaveID}
        `;
        const slaveResult = await requestDB(slaveQuery);
        const masterError = `education with ID ${educationMasterID} not found`;
        const slaveError = `education with ID ${educationSlaveID} not found`;
        if (!masterResult.length) return { code: 404, error: masterError };
        if (!slaveResult.length) return { code: 404, error: slaveError };
        const { 0: { educationPlace: educationMasterPlace }} = masterResult;
        const { 0: { educationPlace: educationSlavePlace }} = slaveResult;
        const updateMasterQuery = `
            UPDATE educations SET educationPlace = ${ educationSlavePlace }
            WHERE educationID = ${educationMasterID}
        `;
        await requestDB(updateMasterQuery);
        const updateSlaveQuery = `
            UPDATE educations SET educationPlace = ${ educationMasterPlace }
            WHERE educationID = ${educationSlaveID}
        `;
        await requestDB(updateSlaveQuery);
        return { code: 200, result: `education places changed` };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteEducation = async (educationID) => {
    try {
        const placeQuery = `
            SELECT educationPlace 
            FROM educations WHERE educationID = ${educationID}
        `;
        const placeResult = await requestDB(placeQuery);
        if (!placeResult.length) return { code: 404, error: `education not found`};
        let { 0: { educationPlace }} = placeResult;
        const query = `DELETE FROM educations WHERE educationID = ${educationID}`;
        const { affectedRows } = await requestDB(query);
        if (!affectedRows) return { code: 0, error: `education delete error` };
        const deletedQuery = `
            SELECT educationID 
            FROM educations WHERE educationPlace > ${educationPlace}
        `;
        const changeFields = await requestDB(deletedQuery);
        for (const { educationID: changeID } of changeFields) {
            const updateQuery = `
                UPDATE educations SET educationPlace = ${educationPlace++}
                WHERE educationID = ${changeID};
            `;
            await requestDB(updateQuery);
        }
        return { code: 200, result: `education ${educationID} deleted` }
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestEducation, requestEducationList,
    saveEducation, moveEducation,
    updateEducation, deleteEducation
};