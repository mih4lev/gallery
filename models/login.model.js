const { requestDB } = require(`../models/db.model`);

const checkLoginData = async (formData) => {
    const { login, password } = formData;
    try {
        const query = `SELECT userPassword, userCookie FROM users WHERE userLogin = '${login}'`;
        const loginData = await requestDB(query);
        if (!loginData[0] || password !== loginData[0].userPassword) {
            return { code: 404, error: `access denied` }
        }
        return { code: 200, cookie: loginData[0].userCookie }
    } catch ({ sqlMessage }) {
        return { code: 0, error: sqlMessage }
    }
};

module.exports = { checkLoginData };