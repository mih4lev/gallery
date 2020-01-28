const { requestDB } = require(`../models/db.model`);

const updatePlaces = async (educationPlace, authorID) => {
    try {
        const placeQuery = `
            SELECT educationID 
            FROM educations
            WHERE educationPlace >= ${educationPlace} AND authorID = ${authorID}
            ORDER BY educationPlace
        `;
        const changeFields = await requestDB(placeQuery);
        console.log(changeFields);
        let updatedPlace = Number(educationPlace) + 1;
        for (const { educationID: changeID } of changeFields) {
            const updateQuery = `
                UPDATE educations SET educationPlace = ${updatedPlace++}
                WHERE educationID = ${changeID};
            `;
            await requestDB(updateQuery);
        }
    } catch (error) {
        return error;
    }
};


// INSERT | CREATE
const saveEducation = async (authorID, params) => {
    const {
        educationYearRU, educationYearEN, educationRU, educationEN, educationPlace
    } = params;
    const countQuery = `SELECT COUNT(educationID) as count FROM educations`;
    const { 0: { count }} = await requestDB(countQuery);
    let setPlace = count + 1;
    if (educationPlace) {
        setPlace = educationPlace;
        await updatePlaces(educationPlace, authorID);
    }
    try {
        const query = `
        INSERT INTO educations (
            authorID, educationYearRU, educationYearEN, 
            educationRU, educationEN, educationPlace
        ) VALUES (
            '${authorID}', '${educationYearRU}', '${educationYearEN}', 
            '${educationRU}', '${educationEN}', ${setPlace}
        )`;
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
    const query = `SELECT * FROM educations ORDER BY educationPlace`;
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
        ORDER BY educationPlace
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
        educationYearRU, educationYearEN, educationRU, educationEN, educationPlace
    } = params;
    const authorQuery = `
        SELECT authorID
        FROM educations WHERE educationID = ${educationID}
    `;
    const { 0: { authorID }} = await requestDB(authorQuery);
    if (!authorID) return { code: 0, error: `updated authorID not found` };
    if (educationPlace) {
        await updatePlaces(educationPlace, authorID);
    }
    const query = `
        UPDATE educations SET 
            educationYearRU = '${educationYearRU}', educationYearEN = '${educationYearEN}', 
            educationRU = '${educationRU}', educationEN = '${educationEN}',
            educationPlace = '${educationPlace}'
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
    saveEducation, updateEducation, deleteEducation
};