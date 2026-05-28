const Product = require("../models/product.model");
const Media = require("../models/media.model");
const cloudinary = require("../config/cloudinary.config");

module.exports = {
  getAll,
  getById,
  getBySlug,
  search,
  create,
  update,
  remove,
};

async function getAll() {
  try {
    const result = await Product.find({ deleted_at: null })
      .populate("category_id", "name slug status")
      .populate("images", "url secure_url")
      .lean();
    return result;
  } catch (error) {
    console.log("Loi lay danh sach san pham");
    throw error;
  }
}

async function getById(id) {
  try {
    const result = await Product.findOne({ _id: id, deleted_at: null })
      .populate("category_id", "name slug status")
      .populate("images", "url secure_url")
      .lean();
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
    const result = await Product.findOne({ slug, deleted_at: null })
      .populate("category_id", "name slug status")
      .populate("images", "url secure_url");
    if (!result) {
      throw new Error("San pham khong ton tai");
    }
    return result;
  } catch (error) {
    console.log("Loi lay san pham");
    throw error;
  }
}

function buildDiacriticRegex(keyword) {
  const map = {
    a: "[aàáảãạâầấẩẫậăằắẳẵặ]",
    A: "[AÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶ]",
    e: "[eèéẻẽẹêềếểễệ]",
    E: "[EÈÉẺẼẸÊỀẾỂỄỆ]",
    i: "[iìíỉĩị]",
    I: "[IÌÍỈĨỊ]",
    o: "[oòóỏõọôồốổỗộơờớởỡợ]",
    O: "[OÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ]",
    u: "[uùúủũụưừứửữự]",
    U: "[UÙÚỦŨỤƯỪỨỬỮỰ]",
    y: "[yỳýỷỹỵ]",
    Y: "[YỲÝỶỸỴ]",
    d: "[dđ]",
    D: "[DĐ]",
  };
  let pattern = "";
  for (const ch of keyword) {
    pattern += map[ch] || ch;
  }
  return new RegExp(pattern, "i");
}

async function search(keyword) {
  try {
    const regex = buildDiacriticRegex(keyword);
    const result = await Product.find({
      deleted_at: null,
      status: true,
      $or: [
        { name: regex },
        { slug: regex },
      ],
    })
      .populate("category_id", "name slug")
      .populate("images", "url")
      .limit(8);
    return result;
  } catch (error) {
    console.log("Loi tim kiem san pham");
    throw error;
  }
}

async function create(body) {
  try {
    const { category_id, name, slug, description, status, features, image_ids } = body;

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
      images: image_ids || [],
    });

    const result = await product.save();
    return await result.populate("images");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function update(id, body) {
  try {
    const { category_id, name, slug, description, status, features, image_ids } = body;

    const product = await Product.findOne({ _id: id, deleted_at: null });
    if (!product) {
      throw new Error("San pham khong ton tai");
    }

    const updateData = {};
    if (category_id) updateData.category_id = category_id;
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (features !== undefined) updateData.features = features;
    if (image_ids !== undefined) updateData.images = image_ids;

    const result = await Product.findOneAndUpdate(
      { _id: id, deleted_at: null },
      updateData,
      { new: true },
    ).populate("images");
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
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("San pham khong ton tai");
    }

    const mediaDocs = await Media.find({ _id: { $in: product.images } });
    const deleteFromCloudinary = mediaDocs.map((m) =>
      cloudinary.uploader.destroy(m.public_id),
    );
    await Promise.all(deleteFromCloudinary);
    await Media.deleteMany({ _id: { $in: product.images } });

    product.deleted_at = new Date();
    product.images = [];
    await product.save();

    return product;
  } catch (error) {
    console.log("Loi xoa san pham");
    throw error;
  }
}
