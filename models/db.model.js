const mysql = require(`promise-mysql`);

const mysqlOptions = {
    host: "89.208.223.225",
    user: "mikhalev",
    password: "i8nvl551s",
    database: "arte",
    port: 3306
};

// const mysqlOptions = {
//     host: "localhost",
//     user: "root",
//     password: "i8nvl551s",
//     database: "gallery",
//     port: 3306
// };

const requestDB = async (query) => {
    const connection = await mysql.createConnection(mysqlOptions);
    const response = await connection.query(query);
    connection.end();
    return await response;
};

module.exports = { requestDB };