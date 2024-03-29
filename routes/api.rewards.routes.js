const { Router } = require(`express`);
const {
    requestReward, requestRewardList,
    saveReward, updateReward, deleteReward
} = require("../models/rewards.model");

const router = new Router();

// POST | CREATE
router.post(`/:authorID`, async (request, response) => {
    const { params: { authorID }} = request;
    const data = await saveReward(authorID, request.body);
    await response.json(data);
});

// GET | READ
router.get(`/`, async (request, response) => {
    const data = await requestRewardList();
    response.send(data);
});
router.get(`/:rewardID`, async (request, response) => {
    const { params: { rewardID }} = request;
    const data = await requestReward(rewardID);
    response.send(data);
});

// PUT | UPDATE
router.put(`/:rewardID`, async (request, response) => {
    const { params: { rewardID }} = request;
    const data = await updateReward(rewardID, request.body);
    await response.json(data);
});

// DELETE
router.delete(`/:rewardID`, async (request, response) => {
    const { params: { rewardID }} = request;
    const data = await deleteReward(rewardID);
    response.send(data);
});

module.exports = router;