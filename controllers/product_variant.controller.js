const ProductVariant = require("../models/product_variant.model");

module.exports = {
  getAll,
  getById,
  getByProductId,
  create,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await ProductVariant.find()
      .populate("product_id")
      .populate("color_id")
      .populate("size_id");
    return result;
  } catch (error) {
    console.log("Loi lay danh sach bien the");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await ProductVariant.findById(id)
      .populate("product_id")
      .populate("color_id")
      .populate("size_id");
    if (!result) {
      throw new Error("Bien the khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay bien the");
    throw error;
  }
}

async function getByProductId(productId) {
  try {
    const result = await ProductVariant.find({ product_id: productId })
      .populate("color_id")
      .populate("size_id");
    return result;
  } catch (error) {
    console.log("Loi lay bien the theo san pham");
    throw error;
  }
}

async function create(body) {
  try {
    const { product_id, price, discount, sale_starts_at, sale_ends_at, color_id, size_id, stock, status } = body;

    const variant = new ProductVariant({
      product_id,
      price,
      discount,
      sale_starts_at,
      sale_ends_at,
      color_id,
      size_id,
      stock,
      status,
    });

    const result = await variant.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { product_id, price, discount, sale_starts_at, sale_ends_at, color_id, size_id, stock, status } = body;

    const updateData = {};
    if (product_id) updateData.product_id = product_id;
    if (price !== undefined) updateData.price = price;
    if (discount !== undefined) updateData.discount = discount;
    if (sale_starts_at !== undefined) updateData.sale_starts_at = sale_starts_at;
    if (sale_ends_at !== undefined) updateData.sale_ends_at = sale_ends_at;
    if (color_id !== undefined) updateData.color_id = color_id;
    if (size_id !== undefined) updateData.size_id = size_id;
    if (stock !== undefined) updateData.stock = stock;
    if (status !== undefined) updateData.status = status;

    const result = await ProductVariant.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      throw new Error("Bien the khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await ProductVariant.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Bien the khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa bien the");
    throw error;
  }
}
