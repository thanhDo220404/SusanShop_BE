const Product = require("../models/product.model");

module.exports = {
  getAll,
  getById,
  getBySlug,
  create,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await Product.find({ deleted_at: null }).populate("category_id");
    return result;
  } catch (error) {
    console.log("Loi lay danh sach san pham");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await Product.findOne({ _id: id, deleted_at: null }).populate("category_id");
    if (!result) {
      throw new Error("San pham khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay san pham");
    throw error;
  }
}

async function getBySlug(slug) {
  try {
    const result = await Product.findOne({ slug, deleted_at: null }).populate("category_id");
    if (!result) {
      throw new Error("San pham khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay san pham");
    throw error;
  }
}

async function create(body) {
  try {
    const { category_id, name, slug, description, status, features } = body;

    const existing = await Product.findOne({ slug });
    if (existing) {
      throw new Error("Slug da ton tai");
    }

    const product = new Product({
      category_id,
      name,
      slug,
      description,
      status,
      features,
    });

    const result = await product.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { category_id, name, slug, description, status, features } = body;

    const updateData = {};
    if (category_id) updateData.category_id = category_id;
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (features !== undefined) updateData.features = features;

    const result = await Product.findOneAndUpdate(
      { _id: id, deleted_at: null },
      updateData,
      { new: true },
    );
    if (!result) {
      throw new Error("San pham khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await Product.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true },
    );
    if (!result) {
      throw new Error("San pham khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa san pham");
    throw error;
  }
}
