const SizeCategory = require("../models/size_category.model");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await SizeCategory.find();
    return result;
  } catch (error) {
    console.log("Loi lay danh sach size category");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await SizeCategory.findById(id);
    if (!result) {
      throw new Error("Size category khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay size category");
    throw error;
  }
}

async function create(body) {
  try {
    const { name } = body;

    const category = new SizeCategory({ name });
    const result = await category.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { name } = body;

    const updateData = {};
    if (name) updateData.name = name;

    const result = await SizeCategory.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      throw new Error("Size category khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await SizeCategory.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Size category khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa size category");
    throw error;
  }
}
