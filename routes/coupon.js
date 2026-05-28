const express = require("express");
const router = express.Router();
const controller = require("../controllers/coupon.controller");

router.get("/", async (req, res) => {
  try {
    const result = await controller.getAll();
    return res.json({ Coupons: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.get("/available", async (req, res) => {
  try {
    const result = await controller.getAvailable(req.query.user_id, Number(req.query.total) || 0);
    return res.json({ Coupons: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.post("/validate", async (req, res) => {
  try {
    const result = await controller.validate(req.body.code, req.body.total);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ mess: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await controller.create(req.body);
    return res.status(201).json({ Coupon: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    return res.json({ Coupon: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await controller.remove(req.params.id);
    return res.json({ Coupon: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

module.exports = router;
