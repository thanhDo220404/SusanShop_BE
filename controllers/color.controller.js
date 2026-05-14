const Color = require("../models/color.model");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await Color.find();
    return result;
  } catch (error) {
    console.log("Loi lay danh sach mau sac");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await Color.findById(id);
    if (!result) {
      throw new Error("Mau sac khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay mau sac");
    throw error;
  }
}

async function create(body) {
  try {
    const { name, hex } = body;

    const color = new Color({ name, hex });
    const result = await color.save();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { name, hex } = body;

    const updateData = {};
    if (name) updateData.name = name;
    if (hex !== undefined) updateData.hex = hex;

    const result = await Color.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) {
      throw new Error("Mau sac khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await Color.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Mau sac khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa mau sac");
    throw error;
  }
}
