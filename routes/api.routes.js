const { Router } = require(`express`);
const { requestPosts } = require("../models/instagram.model");
const { currency } = require("../models/currency.model");
const { checkLoginData } = require("../models/login.model");
const router = new Router();

router.get(`/instagram`, async (request, response) => {
    const data = await requestPosts();
    await response.json(data);
});

router.get(`/currency`, async (request, response) => {
    const data = await currency();
    await response.json(data);
});

router.post(`/login`, async (request, response) => {
    const data = await checkLoginData(request.body);
    if (data.cookie) {
        const options = {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            signed: true
        };
        response.cookie('loginValidate', data.cookie, options);
    }
    await response.json(data);
});

router.delete(`/logout`, async (request, response) => {
    response.cookie('loginValidate', { expires: Date.now() });
    await response.json({ code: 200 });
});

module.exports = router;