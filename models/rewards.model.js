const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveReward = async (authorID, params) => {
    const {
        rewardYearRU, rewardYearEN, rewardRU, rewardEN
    } = params;
    const countQuery = `SELECT COUNT(rewardID) as count FROM rewards`;
    const { 0: { count }} = await requestDB(countQuery);
    const query = `
        INSERT INTO rewards (
            authorID, rewardYearRU, rewardYearEN, 
            rewardRU, rewardEN, rewardPlace
        ) VALUES (
            '${authorID}', '${rewardYearRU}', '${rewardYearEN}', 
            '${rewardRU}', '${rewardEN}', ${count + 1}
        )`;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `reward added` : `reward add error`,
            insertID: insertId
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestRewardList = async () => {
    const query = `SELECT * FROM rewards`;
    return await requestDB(query);
};
const requestReward = async (rewardID) => {
    const query = `
        SELECT 
            rewardYearRU, rewardYearEN, rewardRU, 
            rewardEN, rewardPlace
        FROM rewards WHERE rewardID = '${rewardID}'
    `;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `reward ${rewardID} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateReward = async (rewardID, params) => {
    const errorMessage = { code: 404, error: `reward not found` };
    if (!rewardID) return errorMessage;
    const {
        rewardYearRU, rewardYearEN, rewardRU, rewardEN
    } = params;
    const query = `
        UPDATE rewards SET 
            rewardYearRU = '${rewardYearRU}', rewardYearEN = '${rewardYearEN}', 
            rewardRU = '${rewardRU}', rewardEN = '${rewardEN}' 
        WHERE rewardID = ${rewardID}`;
    try {
        const response = await requestDB(query);
        const { changedRows, message } = response;
        return {
            code: (changedRows) ? 200 : 0,
            result: (changedRows) ? `reward updated` : message
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// DELETE
const deleteReward = async (rewardID) => {
    const query = `DELETE FROM rewards WHERE rewardID = ${rewardID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `reward deleted` : `reward not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestReward, requestRewardList,
    saveReward, updateReward, deleteReward
};