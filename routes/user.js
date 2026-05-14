const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await userController.getAll();
    return res.status(200).json({ Users: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await userController.getById(req.params.id);
    return res.status(200).json({ User: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/register", async function (req, res) {
  try {
    const result = await userController.register(req.body);
    return res.status(201).json({ User: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/login", async function (req, res) {
  try {
    const result = await userController.login(req.body);
    return res.status(200).json({ User: result.user, Token: result.token });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.put("/:id", async function (req, res) {
  try {
    const result = await userController.update(req.params.id, req.body);
    return res.status(200).json({ User: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await userController.remove(req.params.id);
    return res.status(200).json({ User: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
