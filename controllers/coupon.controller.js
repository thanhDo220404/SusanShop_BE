const Coupon = require("../models/coupon.model");

module.exports = {
  getAll,
  getById,
  getAvailable,
  validate,
  create,
  update,
  remove,
};

async function getAll() {
  return await Coupon.find().sort({ createdAt: -1 });
}

async function getById(id) {
  const c = await Coupon.findById(id);
  if (!c) throw new Error("Coupon khong ton tai");
  return c;
}

async function getAvailable(userId, orderTotal) {
  const coupons = await Coupon.find({ status: true });

  return coupons.map((c) => {
    const now = new Date();
    let valid = true;
    let reason = "";

    if (c.usage_limit > 0 && c.used_count >= c.usage_limit) {
      valid = false;
      reason = "Đã hết lượt";
    } else if (c.starts_at && now < new Date(c.starts_at)) {
      valid = false;
      reason = "Chưa có hiệu lực";
    } else if (c.ends_at && now > new Date(c.ends_at)) {
      valid = false;
      reason = "Đã hết hạn";
    } else if (c.min_order > 0 && orderTotal < c.min_order) {
      valid = false;
      reason = `Đơn tối thiểu ${c.min_order.toLocaleString("vi-VN")}đ`;
    }

    let discount = 0;
    if (valid) {
      if (c.type === "percent") {
        discount = orderTotal * (c.value / 100);
        if (c.max_discount > 0 && discount > c.max_discount) {
          discount = c.max_discount;
        }
      } else {
        discount = Math.min(c.value, orderTotal);
      }
    }

    return {
      _id: c._id,
      code: c.code,
      type: c.type,
      value: c.value,
      min_order: c.min_order,
      max_discount: c.max_discount,
      valid,
      reason,
      discount,
    };
  });
}

async function validate(code, orderTotal) {
  const coupon = await Coupon.findOne({
    code: code.toUpperCase().trim(),
    status: true,
    $or: [
      { usage_limit: 0 },
      { $expr: { $lt: ["$used_count", "$usage_limit"] } },
    ],
  });

  if (!coupon) throw new Error("Mã giảm giá không hợp lệ hoặc đã hết lượt");

  if (coupon.starts_at && new Date() < new Date(coupon.starts_at)) {
    throw new Error("Mã giảm giá chưa có hiệu lực");
  }
  if (coupon.ends_at && new Date() > new Date(coupon.ends_at)) {
    throw new Error("Mã giảm giá đã hết hạn");
  }
  if (coupon.min_order > 0 && orderTotal < coupon.min_order) {
    throw new Error(`Đơn tối thiểu ${coupon.min_order.toLocaleString("vi-VN")}đ`);
  }

  let discount = 0;
  if (coupon.type === "percent") {
    discount = orderTotal * (coupon.value / 100);
    if (coupon.max_discount > 0 && discount > coupon.max_discount) {
      discount = coupon.max_discount;
    }
  } else {
    discount = Math.min(coupon.value, orderTotal);
  }

  return { coupon, discount };
}

async function create(body) {
  body.code = body.code.toUpperCase().trim();
  if (body.type === "percent" && body.value > 100) {
    throw new Error("Phần trăm giảm giá không được vượt quá 100%");
  }
  const existing = await Coupon.findOne({ code: body.code });
  if (existing) throw new Error("Mã giảm giá đã tồn tại");
  return await Coupon.create(body);
}

async function update(id, body) {
  if (body.code) body.code = body.code.toUpperCase().trim();
  if (body.type === "percent" && body.value > 100) {
    throw new Error("Phần trăm giảm giá không được vượt quá 100%");
  }
  return await Coupon.findByIdAndUpdate(id, body, { new: true });
}

async function remove(id) {
  return await Coupon.findByIdAndDelete(id);
}
