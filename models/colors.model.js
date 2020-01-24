const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveColor = async (params) => {
    const { colorRU, colorEN, colorName, colorHEX } = params;
    const query = `
        INSERT INTO colors ( colorRU, colorEN, colorName, colorHEX ) 
        VALUES ( '${colorRU}', '${colorEN}', '${colorName}', '${colorHEX}' )
    `;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `color added` : `color add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestColorList = async () => {
    const query = `SELECT * FROM colors`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `colors not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestColor = async (colorID) => {
    const query = `SELECT * FROM colors WHERE colorID = ${colorID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `color ${colorID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateColor = async (colorID, params) => {
    const { colorRU, colorEN, colorName, colorHEX } = params;
    const query = `
        UPDATE colors SET 
            colorRU = '${colorRU}', colorEN = '${colorEN}', 
            colorName = '${colorName}', colorHEX = '${colorHEX}'
        WHERE colorID = ${colorID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `color updated` : `color not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteColor = async (colorID) => {
    const query = `DELETE FROM colors WHERE colorID = ${colorID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `color deleted` : `color not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    saveColor, requestColorList, requestColor,
    updateColor, deleteColor
};