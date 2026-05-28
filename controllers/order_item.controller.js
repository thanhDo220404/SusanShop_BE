const OrderItem = require("../models/order_item.model");

module.exports = {
  getByOrderId,
};

async function getByOrderId(orderId) {
  try {
    return await OrderItem.find({ order_id: orderId }).lean();
  } catch (error) {
    console.log("Loi lay order items");
    throw error;
  }
}