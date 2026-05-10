const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await userController.getAll();
    return res.status(200).json({ Users: result });
  } catch (error) {
    return res.status(500).json({ mess: error });
  }
});
