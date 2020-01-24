const { Router } = require(`express`);
const {
    saveCategory, requestCategoryList, requestCategory,
    requestCategoryEvents, updateCategory, deleteCategory
} = require("../models/categories.model");

const router = new Router();

// POST | CREATE
router.post(`/`, async (request, response) => {
    const data = await saveCategory(request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestCategoryList();
    response.send(data);
});
router.get(`/:categoryLink`, async (request, response) => {
    const { params: { categoryLink }} = request;
    const data = await requestCategory(categoryLink);
    response.send(data);
});
router.get(`/:categoryLink/events`, async (request, response) => {
    const { params: { categoryLink }} = request;
    const data = await requestCategoryEvents(categoryLink);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:categoryID`, async (request, response) => {
    const { params: { categoryID }} = request;
    const data = await updateCategory(categoryID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:categoryID`, async (request, response) => {
    const { params: { categoryID }} = request;
    const data = await deleteCategory(categoryID);
    response.send(data);
});

module.exports = router;