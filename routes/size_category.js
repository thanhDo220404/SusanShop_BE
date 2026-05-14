const express = require("express");
const router = express.Router();
const sizeCategoryController = require("../controllers/size_category.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await sizeCategoryController.getAll();
    return res.status(200).json({ SizeCategories: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await sizeCategoryController.getById(req.params.id);
    return res.status(200).json({ SizeCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await sizeCategoryController.create(req.body);
    return res.status(201).json({ SizeCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await sizeCategoryController.update(req.params.id, req.body);
    return res.status(200).json({ SizeCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await sizeCategoryController.remove(req.params.id);
    return res.status(200).json({ SizeCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
