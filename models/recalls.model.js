const { requestDB } = require(`../models/db.model`);

const saveRecallData = async (clientData) => {
    const patterns = {
        recallName: /^[a-zA-Zа-яА-Я-\s]+$/,
        recallPhone: /^[\s()+-]*([0-9][\s()+-]*){10,11}$/,
        recallEmail: /\S+@\S+\.\S+/
    };
    const { recallName, recallPhone, recallEmail } = clientData;
    const errorData = { code: 0 };
    for (const field in clientData) {
        if (clientData.hasOwnProperty(field)) {
            if (!patterns[field].test(clientData[field])) return errorData;
        } else {
            return errorData;
        }
    }
    console.log(`test`);
    const query = `
        INSERT INTO recalls ( recallName, recallPhone, recallEmail ) 
        VALUES ( '${recallName}', '${recallPhone}', '${recallEmail}' )
    `;
    try {
        const { insertId } = await requestDB(query);
        return {
            code: (insertId) ? 200 : 0,
            result: (insertId) ? `recall added` : `recall add error`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = { saveRecallData };