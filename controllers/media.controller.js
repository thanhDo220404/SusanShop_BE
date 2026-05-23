const cloudinary = require("../config/cloudinary.config");
const Media = require("../models/media.model");

module.exports = {
  uploadSingle,
  uploadMultiple,
  getAll,
  getById,
  update,
  remove,
};

async function uploadSingle(file, folder = "susan_shop") {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    });

    const media = new Media({
      public_id: result.public_id,
      url: result.url,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
      folder: result.folder || folder,
      original_filename: result.original_filename || file.originalname,
      asset_id: result.asset_id,
    });

    return await media.save();
  } catch (error) {
    console.log("Loi upload anh");
    throw error;
  }
}

async function uploadMultiple(files, folder = "susan_shop") {
  try {
    const uploadPromises = files.map((file) => uploadSingle(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.log("Loi upload nhieu anh");
    throw error;
  }
}

async function getAll() {
  try {
    const result = await Media.find().sort({ createdAt: -1 });
    return result;
  } catch (error) {
    console.log("Loi lay danh sach media");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await Media.findById(id);
    if (!result) {
      throw new Error("Media khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay media");
    throw error;
  }
}

async function update(id, body) {
  try {
    const { alt_text, title } = body;

    const updateData = {};
    if (alt_text !== undefined) updateData.alt_text = alt_text;
    if (title !== undefined) updateData.title = title;

    const result = await Media.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!result) {
      throw new Error("Media khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi cap nhat media");
    throw error;
  }
}

async function remove(id) {
  try {
    const media = await Media.findById(id);
    if (!media) {
      throw new Error("Media khong ton tai");
    }

    await cloudinary.uploader.destroy(media.public_id);

    return await Media.findByIdAndDelete(id);
  } catch (error) {
    console.log("Loi xoa media");
    throw error;
  }
}
