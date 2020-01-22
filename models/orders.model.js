const { requestDB } = require(`../models/db.model`);

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

module.exports = { saveOrder };