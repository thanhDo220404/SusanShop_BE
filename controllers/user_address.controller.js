const UserAddress = require("../models/user_address.model");
require("../models/user.model");

module.exports = {
  getByUserId,
  create,
  update,
  remove,
  setDefault,
};

async function getByUserId(userId) {
  try {
    return await UserAddress.find({ user_id: userId }).sort({ is_default: -1, createdAt: -1 });
  } catch (error) {
    console.log("Loi lay dia chi");
    throw error;
  }
}

async function create(body) {
  try {
    if (body.is_default) {
      await UserAddress.updateMany({ user_id: body.user_id }, { is_default: false });
    }
    const address = new UserAddress(body);
    return await address.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    if (body.is_default) {
      const addr = await UserAddress.findById(id);
      if (addr) {
        await UserAddress.updateMany({ user_id: addr.user_id }, { is_default: false });
      }
    }
    return await UserAddress.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    return await UserAddress.findByIdAndDelete(id);
  } catch (error) {
    console.log("Loi xoa dia chi");
    throw error;
  }
}

async function setDefault(id, userId) {
  try {
    await UserAddress.updateMany({ user_id: userId }, { is_default: false });
    return await UserAddress.findByIdAndUpdate(id, { is_default: true }, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
