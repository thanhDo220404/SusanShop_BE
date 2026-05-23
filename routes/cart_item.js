const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cart_item.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await cartItemController.getAll();
    return res.status(200).json({ CartItems: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/user/:userId", async function (req, res) {
  try {
    const result = await cartItemController.getByUserId(req.params.userId);
    return res.status(200).json({ CartItems: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await cartItemController.getById(req.params.id);
    return res.status(200).json({ CartItem: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await cartItemController.create(req.body);
    return res.status(201).json({ CartItem: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await cartItemController.update(req.params.id, req.body);
    return res.status(200).json({ CartItem: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/user/:userId", async function (req, res) {
  try {
    const result = await cartItemController.removeByUserId(req.params.userId);
    return res.status(200).json({ CartItems: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await cartItemController.remove(req.params.id);
    return res.status(200).json({ CartItem: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
