const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveTechnique = async (params) => {
    const { techniqueRU, techniqueEN } = params;
    const query = `
        INSERT INTO techniques ( techniqueRU, techniqueEN ) 
        VALUES ( '${techniqueRU}', '${techniqueEN}' )
    `;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `technique added` : `technique add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestTechniqueList = async () => {
    const query = `SELECT * FROM techniques`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `techniques not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestTechnique = async (techniqueID) => {
    const query = `SELECT * FROM techniques WHERE techniqueID = ${techniqueID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `technique ${techniqueID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateTechnique = async (techniqueID, params) => {
    const { techniqueRU, techniqueEN } = params;
    const query = `
        UPDATE techniques SET 
            techniqueRU = '${techniqueRU}', techniqueEN = '${techniqueEN}'
        WHERE techniqueID = ${techniqueID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `technique updated` : `technique not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteTechnique = async (techniqueID) => {
    const query = `DELETE FROM techniques WHERE techniqueID = ${techniqueID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `technique deleted` : `technique not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    saveTechnique, requestTechniqueList, requestTechnique,
    updateTechnique, deleteTechnique
};