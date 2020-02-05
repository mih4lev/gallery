const checkAdmin = (request, response, next) => {
    request.isAdmin = false;
    next();
};

module.exports = checkAdmin;