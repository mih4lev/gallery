const checkAdmin = async (request, response, next) => {
    const cookie = request.signedCookies.loginValidate;
    if (!cookie) {
        request.isAdmin = false;
        return next();
    }
    try {
        const query = `SELECT userID FROM users WHERE userCookie = '${cookie}'`;
        const loginData = await requestDB(query);
        if (!loginData[0]) {
            request.isAdmin = false;
            return next();
        }
    } catch (error) {
        console.log(error);
    }
    request.isAdmin = true;
    next();
};

module.exports = checkAdmin;