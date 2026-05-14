const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll,
  getById,
  register,
  login,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await userModel.find();
    return result;
  } catch (error) {
    console.log("Loi lay danh sach user");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await userModel.findById(id);
    if (!result) {
      throw new Error("User khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay user");
    throw error;
  }
}

async function register(body) {
  try {
    const { name, email, pass, phone } = body;
    const mail = await userModel.findOne({ email: email });
    if (mail) {
      throw new Error("Email da ton tai");
    }
    //tao pass
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    //Tao user moi
    const user = new userModel({
      name,
      email,
      pass: hash,
      phone,
    });
    //luu db
    const result = await user.save();

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function login(body) {
  try {
    const { email, pass } = body;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Email khong ton tai");
    }

    const isMatch = bcrypt.compareSync(pass, user.pass);
    if (!isMatch) {
      throw new Error("Mat khau khong dung");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" },
    );

    return { user, token };
  } catch (error) {
    console.log("Loi dang nhap");
    throw error;
  }
}

async function update(id, body) {
  try {
    const { name, email, phone, role } = body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (role !== undefined) updateData.role = role;

    if (body.pass) {
      const salt = bcrypt.genSaltSync(10);
      updateData.pass = bcrypt.hashSync(body.pass, salt);
    }

    const result = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!result) {
      throw new Error("User khong ton tai");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id) {
  try {
    const result = await userModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("User khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi xoa user");
    throw error;
  }
}
