const { Router } = require(`express`);
const {
    saveGenre, requestGenreList, requestGenre,
    updateGenre, deleteGenre
} = require("../models/genres.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveGenre(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestGenreList();
    response.send(data);
});
router.get(`/:genreID`, async (request, response) => {
    const { params: { genreID }} = request;
    const data = await requestGenre(genreID);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:genreID`, async (request, response) => {
    const { params: { genreID }} = request;
    const data = await updateGenre(genreID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:genreID`, async (request, response) => {
    const { params: { genreID }} = request;
    const data = await deleteGenre(genreID);
    response.send(data);
});

module.exports = router;