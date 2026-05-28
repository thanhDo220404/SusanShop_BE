const express = require("express");
const cors = require("cors");
const path = require("path");

const usersRouter = require("./routes/user");
const productCategoryRouter = require("./routes/product_category");
const productRouter = require("./routes/product");
const productVariantRouter = require("./routes/product_variant");
const sizeCategoryRouter = require("./routes/size_category");
const sizeOptionRouter = require("./routes/size_option");
const colorRouter = require("./routes/color");
const mediaRouter = require("./routes/media");
const cartItemRouter = require("./routes/cart_item");
const couponRouter = require("./routes/coupon");
const orderRouter = require("./routes/order");
const orderItemRouter = require("./routes/order_item");
const userAddressRouter = require("./routes/user_address");
const reviewRouter = require("./routes/review");

const app = express();

// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Backend đang chạy");
});

app.use("/users", usersRouter);
app.use("/product-categories", productCategoryRouter);
app.use("/products", productRouter);
app.use("/product-variants", productVariantRouter);
app.use("/size-categories", sizeCategoryRouter);
app.use("/size-options", sizeOptionRouter);
app.use("/colors", colorRouter);
app.use("/media", mediaRouter);
app.use("/cart-items", cartItemRouter);
app.use("/coupons", couponRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);
app.use("/user-addresses", userAddressRouter);
app.use("/reviews", reviewRouter);

module.exports = app;
