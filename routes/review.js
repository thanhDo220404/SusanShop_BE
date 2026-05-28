const express = require("express");
const router = express.Router();
const controller = require("../controllers/review.controller");

router.get("/all", async (req, res) => {
  try {
    const result = await controller.getAll();
    return res.json({ Reviews: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.get("/product/:productId", async (req, res) => {
  try {
    const result = await controller.getByProductId(req.params.productId);
    return res.json({ Reviews: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.get("/order/:orderId", async (req, res) => {
  try {
    const result = await controller.getByOrderId(req.params.orderId);
    return res.json({ Reviews: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const result = await controller.getByUserId(req.params.userId);
    return res.json({ Reviews: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await controller.create(req.body);
    return res.status(201).json({ Review: result });
  } catch (error) {
    return res.status(400).json({ mess: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    return res.json({ Review: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await controller.remove(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

module.exports = router;
