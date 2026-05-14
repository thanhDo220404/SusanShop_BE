const express = require("express");
const router = express.Router();
const productVariantController = require("../controllers/product_variant.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await productVariantController.getAll();
    return res.status(200).json({ ProductVariants: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/product/:productId", async function (req, res) {
  try {
    const result = await productVariantController.getByProductId(req.params.productId);
    return res.status(200).json({ ProductVariants: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await productVariantController.getById(req.params.id);
    return res.status(200).json({ ProductVariant: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await productVariantController.create(req.body);
    return res.status(201).json({ ProductVariant: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await productVariantController.update(req.params.id, req.body);
    return res.status(200).json({ ProductVariant: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await productVariantController.remove(req.params.id);
    return res.status(200).json({ ProductVariant: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
