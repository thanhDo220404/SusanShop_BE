const express = require("express");
const router = express.Router();
const colorController = require("../controllers/color.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await colorController.getAll();
    return res.status(200).json({ Colors: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await colorController.getById(req.params.id);
    return res.status(200).json({ Color: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/", async function (req, res) {
  try {
    const result = await colorController.create(req.body);
    return res.status(201).json({ Color: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await colorController.update(req.params.id, req.body);
    return res.status(200).json({ Color: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await colorController.remove(req.params.id);
    return res.status(200).json({ Color: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
