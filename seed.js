require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("./config/cloudinary.config");

require("./models/product.model");
require("./models/product_variant.model");
require("./models/product_category.model");
require("./models/media.model");
require("./models/color.model");
require("./models/size_category.model");
require("./models/size_option.model");

const Product = mongoose.model("Product");
const ProductVariant = mongoose.model("ProductVariant");
const ProductCategory = mongoose.model("ProductCategory");
const Media = mongoose.model("Media");
const Color = mongoose.model("Color");
const SizeOption = mongoose.model("SizeOption");

const IMAGE_URLS = {
  "ao-nam":       "https://loremflickr.com/600/800/shirt,men",
  "ao-polo":      "https://loremflickr.com/600/800/polo,shirt",
  "ao-thun":      "https://loremflickr.com/600/800/t-shirt,fashion",
  "quan-nam":     "https://loremflickr.com/600/800/pants,trousers",
  "quan-short":   "https://loremflickr.com/600/800/shorts,clothing",
  "quan-tay":     "https://loremflickr.com/600/800/trousers,fashion",
  "quan-jeans":   "https://loremflickr.com/600/800/jeans,denim",
  "ao-nu":        "https://loremflickr.com/600/800/blouse,women",
  "quan-nu":      "https://loremflickr.com/600/800/pants,women,fashion",
  "ao-sport-bra": "https://loremflickr.com/600/800/sportswear,activewear",
  "quan-legging": "https://loremflickr.com/600/800/leggings,yoga",
  "quan-short-nu":"https://loremflickr.com/600/800/shorts,women,fashion",
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected\n");

  await ProductVariant.deleteMany({});
  await Product.deleteMany({});
  await Media.deleteMany({});

  console.log("Uploading fashion images to Cloudinary...");
  const mediaMap = {};

  for (const [cat, url] of Object.entries(IMAGE_URLS)) {
    try {
      const r = await cloudinary.uploader.upload(url, { folder: `susan_shop/${cat}` });
      const m = await Media.create({
        public_id: r.public_id, url: r.url, secure_url: r.secure_url,
        width: r.width, height: r.height, format: r.format,
        resource_type: r.resource_type, bytes: r.bytes,
        folder: `susan_shop/${cat}`, original_filename: `${cat}`,
      });
      mediaMap[cat] = [m._id];
      console.log(`  OK: ${cat}`);
    } catch (e) {
      console.error(`  FAIL: ${cat} - ${e.message}`);
      mediaMap[cat] = [];
    }
  }

  console.log("");

  const colors = await Color.find({});
  const allColors = colors.filter(c => c._id);

  const clothingSizes = await SizeOption.find({}).populate("size_category_id");
  const clothSizes = clothingSizes.filter(s => s.size_category_id && s.size_category_id.name === "Clothing").map(s => s._id);

  function slugify(t) {
    return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[dD]/g, "d").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
  }

  const defs = [
    { cat: "ao-nam", name: "Áo Sơ Mi Công Sở", desc: "Vải chống nhăn, dễ giặt ủi, slim-fit lịch lãm.", feat: true, price: 590000, disc: 20 },
    { cat: "ao-nam", name: "Áo Sơ Mi Linen Mùa Hè", desc: "Vải linen blend nhẹ, thoáng mát, regular fit.", feat: false, price: 620000 },
    { cat: "ao-polo", name: "Áo Polo Pique Cotton", desc: "Cotton pique cao cấp, cổ đẹp, nút cắt tinh tế.", feat: true, price: 450000 },
    { cat: "ao-polo", name: "Áo Polo Thể Thao Promax", desc: "Co giãn 4 chiều, giữ dáng, nhanh khô.", feat: false, price: 520000 },
    { cat: "ao-thun", name: "Áo Thun Cotton Compact", desc: "Cotton compact dày dặn, form regular, cổ tròn.", feat: true, price: 250000 },
    { cat: "ao-thun", name: "Áo Thun AirFlow Exdry", desc: "Exdry thấm hút nhanh, thoáng mát.", feat: true, price: 350000, disc: 15 },
    { cat: "quan-nam", name: "Quần Tây Công Sở", desc: "Vải tuxedo cao cấp, slim-fit, giữ form.", feat: true, price: 690000 },
    { cat: "quan-nam", name: "Quần Kaki Chino", desc: "Cotton dáng regular, dễ phối đồ.", feat: false, price: 550000, disc: 10 },
    { cat: "quan-short", name: "Quần Short Kaki", desc: "Kaki cơ bản, vải mềm mịn, túi sâu.", feat: true, price: 320000 },
    { cat: "quan-short", name: "Quần Short Thể Thao", desc: "Chất liệu nhẹ, co giãn, thấm hút.", feat: false, price: 280000, disc: 10 },
    { cat: "quan-tay", name: "Quần Tây Slim Fit", desc: "Slim fit hiện đại, vải cao cấp ít nhăn.", feat: true, price: 650000 },
    { cat: "quan-jeans", name: "Quần Jeans Slim Fit", desc: "Jeans co giãn, form slim trẻ trung.", feat: true, price: 550000 },
    { cat: "quan-jeans", name: "Quần Jeans Regular", desc: "Jeans dáng regular cổ điển, bền đẹp.", feat: false, price: 520000 },
    { cat: "ao-nu", name: "Áo Thun Nữ Cotton Compact", desc: "Cotton compact, form vừa vặn nhẹ nhàng.", feat: true, price: 220000 },
    { cat: "ao-nu", name: "Áo Kiểu Nữ Cổ Tim", desc: "Cổ tim thanh lịch, chất liệu voan nhẹ.", feat: false, price: 350000 },
    { cat: "quan-nu", name: "Quần Tây Nữ Ống Suông", desc: "Ống suông thanh lịch, vải co giãn nhẹ.", feat: true, price: 480000 },
    { cat: "quan-nu", name: "Quần Short Nữ Lưng Cao", desc: "Lưng cao tôn dáng, kaki mềm.", feat: false, price: 290000 },
    { cat: "ao-sport-bra", name: "Áo Sport Bra Power Support", desc: "Hỗ trợ cao, cup may sẵn.", feat: true, price: 390000 },
    { cat: "ao-sport-bra", name: "Áo Sport Bra Seamless", desc: "Không đường may, co giãn nhẹ.", feat: false, price: 340000 },
    { cat: "quan-legging", name: "Quần Legging Power Fit", desc: "Nâng đỡ cơ, lưng cao, co giãn 4 chiều.", feat: true, price: 480000, disc: 15 },
    { cat: "quan-legging", name: "Quần Legging Seamless Sculpt", desc: "Không đường may, tiết trung ôn.", feat: false, price: 550000 },
    { cat: "quan-short-nu", name: "Quần Short Nữ Bike Shorts", desc: "Dáng bike shorts, co giãn, tập luyện.", feat: false, price: 320000 },
  ];

  console.log("Creating products...");
  const variantData = [];

  for (const p of defs) {
    const cat = await ProductCategory.findOne({ slug: p.cat });
    if (!cat) { console.log(`  SKIP ${p.name}`); continue; }

    const imgs = mediaMap[p.cat] || [];
    if (imgs.length === 0 && Object.values(mediaMap).some(a => a.length > 0)) {
      imgs.push(...Object.values(mediaMap).find(a => a.length > 0));
    }

    const product = await Product.create({
      category_id: cat._id, name: p.name, slug: slugify(p.name),
      description: p.desc, status: true, features: !!p.feat,
      images: imgs.filter(Boolean),
    });

    const n = Math.min(allColors.length, 2 + Math.floor(Math.random() * 3));
    const pickColors = [...allColors].sort(() => 0.5 - Math.random()).slice(0, n);
    const pickSizes = [...clothSizes].sort(() => 0.5 - Math.random()).slice(0, Math.min(clothSizes.length, 4));

    for (const c of pickColors) {
      for (const s of pickSizes) {
        variantData.push({
          product_id: product._id, price: p.price, discount: p.disc || 0,
          color_id: c._id, size_id: s,
          stock: 15 + Math.floor(Math.random() * 50), status: true,
          sale_starts_at: p.disc ? new Date("2026-05-01") : null,
          sale_ends_at: p.disc ? new Date("2026-06-30") : null,
        });
      }
    }
    console.log(`  [${defs.indexOf(p) + 1}] ${p.name}`);
  }

  await ProductVariant.insertMany(variantData);
  console.log(`\n${defs.length} products, ${variantData.length} variants - DONE`);
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
