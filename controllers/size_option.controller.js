const SizeOption = require("../models/size_option.model");

module.exports = {
  getAll,
  getById,
  getByCategoryId,
  create,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await SizeOption.find().populate("size_category_id", "name");
    return result;
  } catch (error) {
    console.log("Loi lay danh sach size option");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await SizeOption.findById(id).populate("size_category_id", "name");
    if (!result) {
      throw new Error("Size option khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay size option");
    throw error;
  }
}

async function getByCategoryId(categoryId) {
  try {
    const result = await SizeOption.find({ size_category_id: categoryId });
    return result;
  } catch (error) {
    console.log("Loi lay size option theo category");
    throw error;
  }
}

async function create(body) {
  try {
    const { name, size_category_id } = body;

    const option = new SizeOption({ name, size_category_id });
    const result = await option.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { name, size_category_id } = body;

    const updateData = {};
    if (name) updateData.name = name;
    if (size_category_id) updateData.size_category_id = size_category_id;

    const result = await SizeOption.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      throw new Error("Size option khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await SizeOption.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Size option khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa size option");
    throw error;
  }
}
