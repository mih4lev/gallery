const { Router } = require(`express`);
const {
    requestOptionList, updateOptions
} = require("../models/options.model");

const router = new Router();

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestOptionList();
    response.send(data);
});

// PUT | UPDATE
router.put(`/`, async (request, response) => {
    const data = await updateOptions(request.body);
    await response.json(data);
});


module.exports = router;