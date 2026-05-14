require("dotenv").config();
const mongoose = require("mongoose");

const SizeCategory = require("./models/size_category.model");
const SizeOption = require("./models/size_option.model");
const Color = require("./models/color.model");
const ProductCategory = require("./models/product_category.model");
const Product = require("./models/product.model");
const ProductVariant = require("./models/product_variant.model");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas\n");

    await SizeCategory.deleteMany({});
    await SizeOption.deleteMany({});
    await Color.deleteMany({});
    await ProductCategory.deleteMany({});
    await Product.deleteMany({});
    await ProductVariant.deleteMany({});
    console.log("Cleared existing data\n");

    const clothing = await SizeCategory.create({ name: "Clothing" });
    const shoes = await SizeCategory.create({ name: "Shoes" });
    console.log("Inserted SizeCategories");

    const sizeS = await SizeOption.create({ name: "S", size_category_id: clothing._id });
    const sizeM = await SizeOption.create({ name: "M", size_category_id: clothing._id });
    const sizeL = await SizeOption.create({ name: "L", size_category_id: clothing._id });
    const sizeXL = await SizeOption.create({ name: "XL", size_category_id: clothing._id });
    const size38 = await SizeOption.create({ name: "38", size_category_id: shoes._id });
    const size39 = await SizeOption.create({ name: "39", size_category_id: shoes._id });
    const size40 = await SizeOption.create({ name: "40", size_category_id: shoes._id });
    console.log("Inserted SizeOptions");

    const red = await Color.create({ name: "Red", hex: "#FF0000" });
    const blue = await Color.create({ name: "Blue", hex: "#0000FF" });
    const black = await Color.create({ name: "Black", hex: "#000000" });
    const white = await Color.create({ name: "White", hex: "#FFFFFF" });
    console.log("Inserted Colors");

    const men = await ProductCategory.create({
      name: "Men",
      slug: "men",
      description: "Men's fashion collection",
      size_category_id: clothing._id,
      parent_category_id: null,
      status: true,
      sort_order: 1,
    });
    const women = await ProductCategory.create({
      name: "Women",
      slug: "women",
      description: "Women's fashion collection",
      size_category_id: clothing._id,
      parent_category_id: null,
      status: true,
      sort_order: 2,
    });
    const tshirts = await ProductCategory.create({
      name: "T-Shirts",
      slug: "t-shirts",
      description: "T-shirts for men and women",
      size_category_id: clothing._id,
      parent_category_id: men._id,
      status: true,
      sort_order: 1,
    });
    const shoesCat = await ProductCategory.create({
      name: "Shoes",
      slug: "shoes",
      description: "Footwear collection",
      size_category_id: shoes._id,
      parent_category_id: women._id,
      status: true,
      sort_order: 1,
    });
    console.log("Inserted ProductCategories");

    const tshirt1 = await Product.create({
      category_id: tshirts._id,
      name: "Classic Cotton T-Shirt",
      slug: "classic-cotton-t-shirt",
      description: "Comfortable 100% cotton t-shirt, perfect for everyday wear.",
      status: true,
      features: true,
      deleted_at: null,
    });
    const tshirt2 = await Product.create({
      category_id: tshirts._id,
      name: "Graphic Print T-Shirt",
      slug: "graphic-print-t-shirt",
      description: "Stylish graphic print t-shirt with modern design.",
      status: true,
      features: false,
      deleted_at: null,
    });
    const sneakers = await Product.create({
      category_id: shoesCat._id,
      name: "Running Sneakers",
      slug: "running-sneakers",
      description: "Lightweight running sneakers with cushioned sole.",
      status: true,
      features: true,
      deleted_at: null,
    });
    console.log("Inserted Products");

    await ProductVariant.create({
      product_id: tshirt1._id,
      price: 250000,
      discount: 10,
      sale_starts_at: new Date("2026-05-14"),
      sale_ends_at: new Date("2026-05-21"),
      color_id: black._id,
      size_id: sizeS._id,
      stock: 50,
      status: true,
    });
    await ProductVariant.create({
      product_id: tshirt1._id,
      price: 250000,
      discount: 10,
      sale_starts_at: new Date("2026-05-14"),
      sale_ends_at: new Date("2026-05-21"),
      color_id: white._id,
      size_id: sizeM._id,
      stock: 30,
      status: true,
    });
    await ProductVariant.create({
      product_id: tshirt1._id,
      price: 250000,
      discount: 0,
      sale_starts_at: null,
      sale_ends_at: null,
      color_id: black._id,
      size_id: sizeL._id,
      stock: 20,
      status: true,
    });
    await ProductVariant.create({
      product_id: tshirt2._id,
      price: 300000,
      discount: 15,
      sale_starts_at: new Date("2026-05-14"),
      sale_ends_at: new Date("2026-05-28"),
      color_id: red._id,
      size_id: sizeM._id,
      stock: 40,
      status: true,
    });
    await ProductVariant.create({
      product_id: sneakers._id,
      price: 1200000,
      discount: 20,
      sale_starts_at: new Date("2026-05-14"),
      sale_ends_at: new Date("2026-05-31"),
      color_id: blue._id,
      size_id: size38._id,
      stock: 15,
      status: true,
    });
    await ProductVariant.create({
      product_id: sneakers._id,
      price: 1200000,
      discount: 20,
      sale_starts_at: new Date("2026-05-14"),
      sale_ends_at: new Date("2026-05-31"),
      color_id: black._id,
      size_id: size39._id,
      stock: 25,
      status: true,
    });
    console.log("Inserted ProductVariants");

    console.log("\nSeed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
