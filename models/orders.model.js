const { requestDB } = require(`../models/db.model`);

// INSERT | CREATE
const saveOrder = async (typedData) => {
    const lastIDQuery = `
        SELECT LAST_INSERT_ID(orderID) AS lastID 
        FROM orders ORDER BY lastID DESC LIMIT 1`;
    const { 0: { lastID }} = await requestDB(lastIDQuery);
    const orderNumber = 118205 + lastID;
    const {
        delivery, payment, clientName, clientPhone,
        clientEmail, clientComment, clientCity, clientAddress,
        orderPictures
    } = typedData;
    const checkFields = {
        clientName, clientPhone, clientEmail, clientComment,
        clientCity, clientAddress
    };
    const patterns = {
        clientName: /^[a-zA-Zа-яА-Я-\s]+$/,
        clientPhone: /^[\s()+-]*([0-9][\s()+-]*){10,11}$/,
        clientEmail: /\S+@\S+\.\S+/,
        clientComment: /^[a-zA-Zа-яА-Я0-9\s\.\,\!\?\-\+\=\(\)\/\#\@]{0,200}$/,
        clientCity: /^[а-яА-Яa-zA-Z]+(?:[\s-][а-яА-Яa-zA-Z]+)*$/,
        clientAddress: /^[a-zA-Zа-яА-Я0-9\s\.\,\!\?\-\+\=]{10,200}$/
    };
    const errorData = { code: 0 };
    for (const field in checkFields) {
        if (checkFields.hasOwnProperty(field)) {
            if (!patterns[field].test(typedData[field])) return errorData;
        } else {
            return errorData;
        }
    }
    const query = `
        INSERT INTO orders (
            orderNumber, delivery, payment, clientName, clientPhone, 
            clientEmail, clientComment, clientCity, clientAddress, 
            orderPictures
        ) VALUES (
            '${orderNumber}', '${delivery}', '${payment}', '${clientName}', '${clientPhone}',
            '${clientEmail}', '${clientComment}', '${clientCity}', '${clientAddress}',
            '${orderPictures}'
        )`;
    const result = await requestDB(query);
    return { code: (result.insertId) ? 200 : 0, orderNumber };
};

// SELECT | READ
const requestOrderList = async () => {
    const query = `SELECT * FROM orders`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `orders not found` };
        return (data.length) ? data: errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};
const requestOrder = async (orderNumber) => {
    const query = `SELECT * FROM orders WHERE orderNumber = ${orderNumber}`;
    try {
        const data = await requestDB(query);
        const errorData = { code: 404, result: `order ${orderNumber} not found` };
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

//DELETE
const deleteOrder = async (orderID) => {
    const query = `DELETE FROM orders WHERE orderID = ${orderID}`;
    try {
        const { affectedRows } = await requestDB(query);
        return {
            code: (affectedRows) ? 200 : 404,
            result: (affectedRows) ? `order deleted` : `order not found`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = { saveOrder, requestOrderList, requestOrder, deleteOrder };