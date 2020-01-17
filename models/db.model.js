const { Pool } = require('pg');

const connectionString = `postgres://dyghgxcwvszstm:64a6d0cd25bccd8e29223b8be89808fc1bc64e0c97dcca2e547d20792f0a6290@ec2-54-246-100-246.eu-west-1.compute.amazonaws.com:5432/ddt9hcs6rf0stl`;

const poolSettings = { connectionString, ssl: true };
const pool = new Pool(poolSettings);

const requestDB = async (query) => {
    const client = await pool.connect();
    const result = await client.query(query);
    client.end();
    return result.rows;
};

module.exports = { requestDB };