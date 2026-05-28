const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_address.controller");

module.exports = router;

router.get("/user/:userId", async (req, res) => {
  try {
    const result = await controller.getByUserId(req.params.userId);
    return res.status(200).json({ Addresses: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await controller.create(req.body);
    return res.status(201).json({ Address: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await controller.update(req.params.id, req.body);
    return res.status(200).json({ Address: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id/default", async (req, res) => {
  try {
    const result = await controller.setDefault(req.params.id, req.body.user_id);
    return res.status(200).json({ Address: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await controller.remove(req.params.id);
    return res.status(200).json({ Address: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
