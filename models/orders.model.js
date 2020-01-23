const { requestDB } = require(`../models/db.model`);

const requestOrderList = async () => {
    const query = `SELECT * FROM orders`;
    return await requestDB(query);
};

const requestOrder = async (orderID) => {
    const query = `SELECT * FROM orders WHERE orderID = ${orderID}`;
    const response = await requestDB(query);
    return response[0];
};

const saveOrder = async (typedData) => {
    const lastOrderQuery = `SELECT COUNT(*) AS ordersCount FROM orders`;
    const { 0: { ordersCount }} = await requestDB(lastOrderQuery);
    const orderNumber = 118205 + ordersCount;
    const {
        delivery, payment, clientName, clientPhone,
        clientEmail, clientComment, clientCity, clientAddress
    } = typedData;
    const query = `INSERT INTO orders (
        orderNumber, delivery, payment, clientName, clientPhone, 
        clientEmail, clientComment, clientCity, clientAddress
    ) VALUES (
        '${orderNumber}', '${delivery}', '${payment}', '${clientName}', '${clientPhone}',
        '${clientEmail}', '${clientComment}', '${clientCity}', '${clientAddress}' 
    )`;
    const result = await requestDB(query);
    return { code: (result.insertId) ? 200 : 0, orderNumber };
};

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