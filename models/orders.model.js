const { requestDB } = require(`../models/db.model`);
const { sendClientMail, sendOwnerMail } = require(`../models/mail.model`);
const { photosArray } = require(`./pictures-data.model`);

// INSERT | CREATE
const saveOrder = async (typedData, lang) => {
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
        clientCity: /^[a-zA-Zа-яА-Я0-9\s\.\,\!\?\-\+\=\(\)\/\#\@]{0,200}$/,
        clientAddress: /^[a-zA-Zа-яА-Я0-9\s\.\,\!\?\-\+\=\(\)\/\#\@]{0,200}$/,
    };
    const errorData = { code: 0, error: `validation failed` };
    for (const field in checkFields) {
        if (checkFields.hasOwnProperty(field)) {
            if (!patterns[field].test(typedData[field])) return errorData;
        } else {
            return errorData;
        }
    }
    try {
        const query = `
        INSERT INTO orders (
            orderNumber, delivery, payment, clientName, clientPhone, 
            clientEmail, clientComment, clientCity, clientAddress, 
            orderPictures, orderStatus
        ) VALUES (
            '${orderNumber}', '${delivery}', '${payment}', '${clientName}', '${clientPhone}',
            '${clientEmail}', '${clientComment}', '${clientCity}', '${clientAddress}',
            '${orderPictures}', 'new'
        )`;
        await sendClientMail(orderNumber, typedData, lang);
        await sendOwnerMail(orderNumber, typedData);
        const result = await requestDB(query);
        return { code: (result.insertId) ? 200 : 0, orderNumber };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// SELECT | READ
const requestOrderList = async () => {
    const query = `
        SELECT
            orderID, orderNumber, delivery, payment, clientName, clientPhone, clientEmail, 
            clientComment, clientCity, clientAddress, orderPictures, orderStatus, DATE_FORMAT(orderDate,'%d.%m.%Y %H:%i') as formatedDate
        FROM orders ORDER BY orderDate DESC
    `;
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
        if (data[0].orderPictures) {
            const picturesArray = data[0].orderPictures.split(`,`);
            data[0].orderPictures = [];
            for (const pictureID of picturesArray) {
                const query = `
                    SELECT 
                        pictures.pictureID as pictureID, 
                        pictures.pictureRU as picture, 
                        pictures.picturePrice as picturePrice, 
                        pictures.picturePriceSale as picturePriceSale, 
                        authors.authorID as authorID,
                        authors.authorRU as author,
                        authors.authorPhoto as authorPhoto
                    FROM pictures 
                    INNER JOIN authors ON pictures.authorID = authors.authorID
                    WHERE pictureID = ${pictureID}`;
                const pictureData = await requestDB(query);
                for (const picture of pictureData) {
                    await photosArray(picture, `ru`);
                }
                data[0].orderPictures.push(pictureData[0]);
            }
        }
        return (data.length) ? data[0] : errorData;
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

// UPDATE
const updateOrderStatus = async (orderNumber, status) => {
    const query = `        
        UPDATE orders SET orderStatus = '${status}' 
        WHERE orderNumber = ${orderNumber}`;
    try {
        await requestDB(query);
        return {
            code: 200,
            result: `order ${orderNumber} status updated`
        };
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

//DELETE
const deleteOrder = async (orderNumber) => {
    const query = `DELETE FROM orders WHERE orderNumber = ${orderNumber}`;
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

module.exports = {
    saveOrder, requestOrderList, requestOrder,
    updateOrderStatus, deleteOrder
};