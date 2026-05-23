const ProductCategory = require("../models/product_category.model");

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
    const result = await ProductCategory.find().populate("size_category_id");
    return result;
  } catch (error) {
    console.log("Loi lay danh sach danh muc");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await ProductCategory.findById(id);
    if (!result) {
      throw new Error("Danh muc khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay danh muc");
    throw error;
  }
}

async function getBySlug(slug) {
  try {
    const result = await ProductCategory.findOne({ slug });
    if (!result) {
      throw new Error("Danh muc khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay danh muc");
    throw error;
  }
}

async function create(body) {
  try {
    const {
      name,
      slug,
      description,
      size_category_id,
      parent_category_id,
      status,
      sort_order,
    } = body;

    const existing = await ProductCategory.findOne({ slug });
    if (existing) {
      throw new Error("Slug da ton tai");
    }

    const category = new ProductCategory({
      name,
      slug,
      description,
      size_category_id,
      parent_category_id,
      status,
      sort_order,
    });

    const result = await category.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const {
      name,
      slug,
      description,
      size_category_id,
      parent_category_id,
      status,
      sort_order,
    } = body;

    const updateData = {};
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (size_category_id !== undefined)
      updateData.size_category_id = size_category_id;
    if (parent_category_id !== undefined)
      updateData.parent_category_id = parent_category_id;
    if (status !== undefined) updateData.status = status;
    if (sort_order !== undefined) updateData.sort_order = sort_order;

    const result = await ProductCategory.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!result) {
      throw new Error("Danh muc khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await ProductCategory.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Danh muc khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa danh muc");
    throw error;
  }
}
