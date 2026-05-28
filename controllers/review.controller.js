const Review = require("../models/review.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/order_item.model");
const ProductVariant = require("../models/product_variant.model");
require("../models/user.model");
require("../models/product.model");

module.exports = {
  getAll,
  getByProductId,
  getByOrderId,
  getByUserId,
  create,
  update,
  remove,
};

async function getAll() {
  return await Review.find()
    .populate("user_id", "name")
    .populate({ path: "order_item_id", select: "order_id" })
    .populate({
      path: "product_variant_id",
      select: "product_id color_id size_id",
      populate: [
        { path: "product_id", select: "name" },
        { path: "color_id", select: "name code" },
        { path: "size_id", select: "name" },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();
}

async function getByProductId(productId) {
  const variants = await ProductVariant.find({ product_id: productId }).select("_id").lean();
  const variantIds = variants.map((v) => v._id);
  return await Review.find({ product_variant_id: { $in: variantIds }, status: true })
    .populate("user_id", "name")
    .populate({ path: "product_variant_id", select: "color_id size_id", populate: [{ path: "color_id", select: "name" }, { path: "size_id", select: "name" }] })
    .sort({ createdAt: -1 })
    .lean();
}

async function getByOrderId(orderId) {
  const orderItems = await OrderItem.find({ order_id: orderId }).select("_id").lean();
  const itemIds = orderItems.map((i) => i._id);
  return await Review.find({ order_item_id: { $in: itemIds } })
    .populate("user_id", "name")
    .populate({ path: "product_variant_id", select: "product_id", populate: { path: "product_id", select: "name" } })
    .sort({ createdAt: -1 })
    .lean();
}

async function getByUserId(userId) {
  return await Review.find({ user_id: userId, status: true })
    .populate({ path: "order_item_id", select: "order_id" })
    .sort({ createdAt: -1 })
    .lean();
}

async function create(body) {
  const { user_id, product_variant_id, order_item_id, rating, content } = body;

  const existing = await Review.findOne({ order_item_id });
  if (existing) throw new Error("Bạn đã đánh giá sản phẩm này rồi");

  const orderItem = await OrderItem.findOne({ _id: order_item_id }).populate(
    "order_id",
  );
  if (!orderItem) throw new Error("Sản phẩm không tồn tại");

  const order = orderItem.order_id;
  if (!order || order.user_id.toString() !== user_id)
    throw new Error("Đơn hàng không hợp lệ");
  if (order.status !== "delivered")
    throw new Error("Bạn cần nhận hàng trước khi đánh giá");

  return await Review.create({
    user_id,
    order_item_id,
    product_variant_id: product_variant_id || orderItem.product_variant_id,
    rating,
    content: content || "",
  });
}

async function update(id, body) {
  return await Review.findByIdAndUpdate(id, body, { new: true });
}

async function remove(id) {
  return await Review.findByIdAndDelete(id);
}
