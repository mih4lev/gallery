const mysql = require(`promise-mysql`);
const config = require(`config`);
const mysqlOptions = {
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
    port: config.get('mysql.port')
};

const requestDB = async (query) => {
    const connection = await mysql.createConnection(mysqlOptions);
    const response = await connection.query(query);
    connection.end();
    return await response;
};

module.exports = { requestDB };