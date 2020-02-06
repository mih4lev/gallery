const checkAdmin = (request, response, next) => {
    request.isAdmin = true;
    next();
};

module.exports = checkAdmin;