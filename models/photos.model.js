const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const savePhoto = async (params) => {
    const { photoNameRU, photoNameEN, photoLink } = params;
    const query = `
        INSERT INTO colors ( photoNameRU, photoNameEN, photoLink ) 
        VALUES ( '${photoNameRU}', '${photoNameEN}', '${photoLink}' )
    `;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `photo added` : `photo add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestPhotoList = async () => {
    const query = `SELECT * FROM photos`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `photos not found` };
        return (data.length) ? data : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestPhoto = async (photoID) => {
    const query = `SELECT * FROM photos WHERE photoID = ${photoID}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `photo ${photoID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updatePhoto = async (photoID, params) => {
    const { photoNameRU, photoNameEN, photoLink } = params;
    const query = `
        UPDATE photos SET 
            photoNameRU = '${photoNameRU}', photoNameEN = '${photoNameEN}', 
            photoLink = '${photoLink}'
        WHERE photoID = ${photoID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `photo updated` : `photo not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deletePhoto = async (photoID) => {
    const query = `DELETE FROM photos WHERE photoID = ${photoID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `photo deleted` : `photo not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    savePhoto, requestPhotoList, requestPhoto,
    updatePhoto, deletePhoto
};