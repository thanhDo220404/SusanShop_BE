const express = require("express");
const router = express.Router();
const sizeOptionController = require("../controllers/size_option.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await sizeOptionController.getAll();
    return res.status(200).json({ SizeOptions: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/category/:categoryId", async function (req, res) {
  try {
    const result = await sizeOptionController.getByCategoryId(req.params.categoryId);
    return res.status(200).json({ SizeOptions: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await sizeOptionController.getById(req.params.id);
    return res.status(200).json({ SizeOption: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await sizeOptionController.create(req.body);
    return res.status(201).json({ SizeOption: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await sizeOptionController.update(req.params.id, req.body);
    return res.status(200).json({ SizeOption: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await sizeOptionController.remove(req.params.id);
    return res.status(200).json({ SizeOption: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
