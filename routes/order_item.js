const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/order_item.controller");

module.exports = router;

router.get("/order/:orderId", async function (req, res) {
  try {
    const result = await orderItemController.getByOrderId(req.params.orderId);
    return res.status(200).json({ OrderItems: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
