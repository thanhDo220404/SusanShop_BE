const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/product_category.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await productCategoryController.getAll();
    return res.status(200).json({ ProductCategories: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await productCategoryController.getById(req.params.id);
    return res.status(200).json({ ProductCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/slug/:slug", async function (req, res) {
  try {
    const result = await productCategoryController.getBySlug(req.params.slug);
    return res.status(200).json({ ProductCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await productCategoryController.create(req.body);
    return res.status(201).json({ ProductCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await productCategoryController.update(req.params.id, req.body);
    return res.status(200).json({ ProductCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await productCategoryController.remove(req.params.id);
    return res.status(200).json({ ProductCategory: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
