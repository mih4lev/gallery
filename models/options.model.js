const { requestDB } = require(`../models/db.model`);

// SELECT | READ
const requestOptionList = async () => {
    const query = `SELECT * FROM options`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `pages not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateOptions = async (params) => {
    const {
        addressRU, addressEN, timelineRU, timelineEN, phoneRU, phoneEN,
        emailRU, emailEN, facebookRU, facebookEN, instagramRU, instagramEN
    } = params;
    const query = `
        UPDATE options SET 
            addressRU = '${addressRU}', addressEN = '${addressEN}', 
            timelineRU = '${timelineRU}', timelineEN = '${timelineEN}', 
            phoneRU = '${phoneRU}', phoneEN = '${phoneEN}', 
            emailRU = '${emailRU}', emailEN = '${emailEN}',
            facebookRU = '${facebookRU}', facebookEN = '${facebookEN}',
            instagramRU = '${instagramRU}', instagramEN = '${instagramEN}'`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `options updated` : `options not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestOptionList, updateOptions
};