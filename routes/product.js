const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const { q } = req.query;
    if (q && q.trim()) {
      const result = await productController.search(q.trim());
      return res.status(200).json({ Products: result });
    }
    const result = await productController.getAll();
    return res.status(200).json({ Products: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/slug/:slug", async function (req, res) {
  try {
    const result = await productController.getBySlug(req.params.slug);
    return res.status(200).json({ Product: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await productController.getById(req.params.id);
    return res.status(200).json({ Product: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await productController.create(req.body);
    return res.status(201).json({ Product: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await productController.update(req.params.id, req.body);
    return res.status(200).json({ Product: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await productController.remove(req.params.id);
    return res.status(200).json({ Product: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
