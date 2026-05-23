const CartItem = require("../models/cart_item.model");
const ProductVariant = require("../models/product_variant.model");

module.exports = {
  getAll,
  getById,
  getByUserId,
  create,
  update,
  remove,
  removeByUserId,
};

async function getAll() {
  try {
    const result = await CartItem.find()
      .populate("user_id")
      .populate({
        path: "product_variant_id",
        populate: [
          { path: "product_id", populate: { path: "images" } },
          { path: "color_id" },
          { path: "size_id" },
        ],
      });
    return result;
  } catch (error) {
    console.log("Loi lay danh sach gio hang");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await CartItem.findById(id)
      .populate("user_id")
      .populate({
        path: "product_variant_id",
        populate: [
          { path: "product_id", populate: { path: "images" } },
          { path: "color_id" },
          { path: "size_id" },
        ],
      });
    if (!result) {
      throw new Error("San pham trong gio hang khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay san pham trong gio hang");
    throw error;
  }
}

async function getByUserId(userId) {
  try {
    const result = await CartItem.find({ user_id: userId })
      .populate("user_id")
      .populate({
        path: "product_variant_id",
        populate: [
          { path: "product_id", populate: { path: "images" } },
          { path: "color_id" },
          { path: "size_id" },
        ],
      });
    return result;
  } catch (error) {
    console.log("Loi lay gio hang theo nguoi dung");
    throw error;
  }
}

async function create(body) {
  try {
    const { user_id, product_variant_id, quantity } = body;

    const variant = await ProductVariant.findById(product_variant_id);
    const maxStock = variant?.stock || 0;

    const existingItem = await CartItem.findOne({
      user_id,
      product_variant_id,
    });

    if (existingItem) {
      const newTotal = existingItem.quantity + (quantity || 1);
      existingItem.quantity = Math.min(newTotal, maxStock);
      const result = await existingItem.save();
      return result;
    }

    const cartItem = new CartItem({
      user_id,
      product_variant_id,
      quantity: Math.min(quantity || 1, maxStock),
    });

    const result = await cartItem.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { user_id, product_variant_id, quantity } = body;

    const updateData = {};
    if (user_id) updateData.user_id = user_id;
    if (product_variant_id) updateData.product_variant_id = product_variant_id;
    if (quantity !== undefined) {
      const cartItem = await CartItem.findById(id).populate("product_variant_id");
      const variant = cartItem?.product_variant_id;
      const maxStock = (typeof variant === "object" ? variant.stock : null)
        || (await ProductVariant.findById(cartItem?.product_variant_id))?.stock
        || 0;
      updateData.quantity = Math.min(quantity, maxStock);
    }

    const result = await CartItem.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!result) {
      throw new Error("San pham trong gio hang khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await CartItem.findByIdAndDelete(id);
    if (!result) {
      throw new Error("San pham trong gio hang khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa san pham trong gio hang");
    throw error;
  }
}

async function removeByUserId(userId) {
  try {
    const result = await CartItem.deleteMany({ user_id: userId });
    return result;
  } catch (error) {
    console.log("Loi xoa gio hang theo nguoi dung");
    throw error;
  }
}
