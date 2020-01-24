const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveReward = async (params) => {
    const {
        authorID, rewardYearRU, rewardYearEN, rewardRU, rewardEN
    } = params;
    const query = `
        INSERT INTO rewards (
            authorID, rewardYearRU, rewardYearEN, rewardRU, rewardEN
        ) VALUES (
            '${authorID}', '${rewardYearRU}', '${rewardYearEN}', 
            '${rewardRU}', '${rewardEN}'
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

// UPDATE
const updateReward = async (rewardID, params) => {
    const {
        rewardYearRU, rewardYearEN, rewardRU, rewardEN
    } = params;
    const query = `
        UPDATE rewards SET 
            rewardYearRU = '${rewardYearRU}', rewardYearEN = '${rewardYearEN}', 
            rewardRU = '${rewardRU}', rewardEN = '${rewardEN}' 
        WHERE rewardID = ${rewardID}`;
    try {
        const { changedRows } = await requestDB(query);
        return {
            code: (changedRows) ? 200 : 404,
            result: (changedRows) ? `reward updated` : `reward not found`
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

module.exports = { requestRewardList, saveReward, updateReward, deleteReward };