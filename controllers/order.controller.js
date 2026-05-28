const Order = require("../models/order.model");
const OrderItem = require("../models/order_item.model");
const ProductVariant = require("../models/product_variant.model");
const Coupon = require("../models/coupon.model");
const { paginate } = require("../utils/pagination");
require("../models/user.model");

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  updateStatus,
};

async function getAll(options = {}) {
  try {
    const hasPagination = options.page || options.limit;

    if (!hasPagination) {
      const result = await Order.find()
        .populate("user_id", "name email phone")
        .sort({ createdAt: -1 })
        .lean();
      return { Orders: result };
    }

    const { page, limit, skip } = paginate(options);

    const [data, total] = await Promise.all([
      Order.find()
        .populate("user_id", "name email phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(),
    ]);

    return {
      Orders: data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  } catch (error) {
    console.log("Loi lay danh sach don hang");
    throw error;
  }
}

async function getById(id) {
  try {
    const [order, items] = await Promise.all([
      Order.findById(id).populate("user_id", "name email phone").lean(),
      OrderItem.find({ order_id: id }).lean(),
    ]);
    if (!order) throw new Error("Don hang khong ton tai");
    return { ...order, items };
  } catch (error) {
    console.log("Loi lay don hang");
    throw error;
  }
}

async function getByUserId(userId) {
  try {
    const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 }).lean();
    const orderIds = orders.map((o) => o._id);
    const allItems = await OrderItem.find({ order_id: { $in: orderIds } }).lean();

    const itemsMap = {};
    for (const item of allItems) {
      const oid = String(item.order_id);
      if (!itemsMap[oid]) itemsMap[oid] = [];
      itemsMap[oid].push(item);
    }

    return orders.map((o) => ({
      ...o.toObject(),
      items: itemsMap[String(o._id)] || [],
    }));
  } catch (error) {
    console.log("Loi lay don hang theo user");
    throw error;
  }
}

async function create(body) {
  try {
    const {
      user_id,
      total,
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_fee,
      coupon_code,
      coupon_discount,
      notes,
      items,
    } = body;

    if (!items || items.length === 0) {
      throw new Error("Don hang khong co san pham");
    }

    for (const item of items) {
      const variant = await ProductVariant.findById(item.product_variant_id);
      if (!variant) {
        throw new Error(`San pham "${item.product_name}" khong ton tai`);
      }
      if (!variant.status) {
        throw new Error(`San pham "${item.product_name}" da ngung ban`);
      }
      if (variant.stock < item.quantity) {
        throw new Error(
          `San pham "${item.product_name}" chi con ${variant.stock} san pham`,
        );
      }
    }

    for (const item of items) {
      await ProductVariant.findByIdAndUpdate(item.product_variant_id, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = new Order({
      user_id,
      total,
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_fee: shipping_fee || 0,
      coupon_code: coupon_code || "",
      coupon_discount: coupon_discount || 0,
      notes: notes || "",
      status_history: [{ status: "pending", changed_at: new Date() }],
    });

    const savedOrder = await order.save();

    const orderItems = items.map((item) => ({
      order_id: savedOrder._id,
      product_variant_id: item.product_variant_id,
      product_name: item.product_name || "",
      color_name: item.color_name || "",
      size_name: item.size_name || "",
      image_url: item.image_url || "",
      price: item.price,
      discount: item.discount || 0,
      quantity: item.quantity,
    }));
    await OrderItem.insertMany(orderItems);

    if (coupon_code) {
      await Coupon.findOneAndUpdate({ code: coupon_code }, { $inc: { used_count: 1 } });
    }

    return savedOrder;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const STATUS_LABELS = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

const VALID_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipping"],
  shipping: ["delivered"],
  delivered: [],
  cancelled: [],
};

async function updateStatus(id, status) {
  try {
    const order = await Order.findById(id);
    if (!order) throw new Error("Đơn hàng không tồn tại");

    const allowed = VALID_TRANSITIONS[order.status] || [];
    if (!allowed.includes(status)) {
      const currentLabel = STATUS_LABELS[order.status] || order.status;
      throw new Error(`Không thể chuyển từ "${currentLabel}" sang "${STATUS_LABELS[status] || status}"`);
    }

    if (status === "cancelled" && order.status !== "cancelled") {
      const items = await OrderItem.find({ order_id: id });
      for (const item of items) {
        await ProductVariant.findByIdAndUpdate(item.product_variant_id, {
          $inc: { stock: item.quantity },
        });
      }
    }

    if (status !== "cancelled" && order.status === "cancelled") {
      const items = await OrderItem.find({ order_id: id });
      for (const item of items) {
        await ProductVariant.findByIdAndUpdate(item.product_variant_id, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    order.status = status;
    order.status_history.push({ status, changed_at: new Date() });
    await order.save();
    return order;
  } catch (error) {
    console.log("Loi cap nhat trang thai don hang");
    throw error;
  }
}
