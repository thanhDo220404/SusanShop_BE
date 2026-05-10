const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  getAll,
  register,
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
