const express = require("express");
const router = express.Router();
const { calculate } = require("../utils/shipping");

router.post("/calculate", (req, res) => {
  try {
    const fee = calculate(req.body.province);
    return res.json({ fee });
  } catch (error) {
    return res.status(500).json({ mess: error.message });
  }
});

module.exports = router;
