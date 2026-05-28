const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const { page, limit } = req.query;
    const result = await orderController.getAll({ page, limit });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/user/:userId", async function (req, res) {
  try {
    const result = await orderController.getByUserId(req.params.userId);
    return res.status(200).json({ Orders: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await orderController.getById(req.params.id);
    return res.status(200).json({ Order: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await orderController.create(req.body);
    return res.status(201).json({ Order: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id/status", async function (req, res) {
  try {
    const result = await orderController.updateStatus(req.params.id, req.body.status);
    return res.status(200).json({ Order: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
