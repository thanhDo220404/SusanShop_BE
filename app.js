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

module.exports = app;
