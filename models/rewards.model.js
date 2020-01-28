const { requestDB } = require(`../models/db.model`);

const updatePlaces = async (rewardPlace, authorID) => {
    try {
        const placeQuery = `
            SELECT rewardID 
            FROM rewards 
            WHERE rewardPlace >= ${rewardPlace} AND authorID = ${authorID}
            ORDER BY rewardPlace
        `;
        const changeFields = await requestDB(placeQuery);
        let updatedPlace = Number(rewardPlace) + 1;
        for (const { rewardID: changeID } of changeFields) {
            const updateQuery = `
                UPDATE rewards SET rewardPlace = ${updatedPlace++}
                WHERE rewardID = ${changeID};
            `;
            await requestDB(updateQuery);
        }
    } catch (error) {
        return error;
    }
};

// INSERT | CREATE
const saveReward = async (authorID, params) => {
    const {
        rewardYearRU, rewardYearEN, rewardRU, rewardEN, rewardPlace
    } = params;
    const countQuery = `SELECT COUNT(rewardID) as count FROM rewards`;
    const { 0: { count }} = await requestDB(countQuery);
    let setPlace = count + 1;
    if (rewardPlace) {
        setPlace = rewardPlace;
        await updatePlaces(rewardPlace, authorID);
    }
    try {
        const query = `
            INSERT INTO rewards (
                authorID, rewardYearRU, rewardYearEN, 
                rewardRU, rewardEN, rewardPlace
            ) VALUES (
                '${authorID}', '${rewardYearRU}', '${rewardYearEN}', 
                '${rewardRU}', '${rewardEN}', ${setPlace}
            )`;
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
    const query = `SELECT * FROM rewards ORDER BY rewardPlace`;
    return await requestDB(query);
};
const requestReward = async (rewardID) => {
    const query = `
        SELECT 
            rewardYearRU, rewardYearEN, rewardRU, 
            rewardEN, rewardPlace
        FROM rewards 
        WHERE rewardID = '${rewardID} 
        ORDER BY rewardPlace'
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
        rewardYearRU, rewardYearEN, rewardRU, rewardEN, rewardPlace
    } = params;
    const authorQuery = `
        SELECT authorID
        FROM rewards WHERE rewardID = ${rewardID}
    `;
    const { 0: { authorID }} = await requestDB(authorQuery);
    if (!authorID) return { code: 0, error: `updated authorID not found` };
    if (rewardPlace) {
        await updatePlaces(rewardPlace, authorID);
    }
    const query = `
        UPDATE rewards SET 
            rewardYearRU = '${rewardYearRU}', rewardYearEN = '${rewardYearEN}', 
            rewardRU = '${rewardRU}', rewardEN = '${rewardEN}', rewardPlace = ${rewardPlace}
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
    try {
        const placeQuery = `
            SELECT rewardPlace 
            FROM rewards WHERE rewardID = ${rewardID}
        `;
        const placeResult = await requestDB(placeQuery);
        if (!placeResult.length) return { code: 404, error: `reward not found`};
        let { 0: { rewardPlace }} = placeResult;
        const query = `DELETE FROM rewards WHERE rewardID = ${rewardID}`;
        const { affectedRows } = await requestDB(query);
        if (!affectedRows) return { code: 0, error: `reward delete error` };
        const deletedQuery = `
            SELECT rewardID 
            FROM rewards WHERE rewardPlace > ${rewardPlace}
        `;
        const changeFields = await requestDB(deletedQuery);
        for (const { rewardID: changeID } of changeFields) {
            const updateQuery = `
                UPDATE rewards SET rewardPlace = ${rewardPlace++}
                WHERE rewardID = ${changeID};
            `;
            await requestDB(updateQuery);
        }
        return { code: 200, result: `reward ${rewardID} deleted` }
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = {
    requestReward, requestRewardList,
    saveReward, updateReward, deleteReward
};