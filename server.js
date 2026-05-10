require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    const PORT = process.env.PORT || 2204;

    app
      .listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}/`);
      })
      .on("error", (err) => {
        console.error("Server failed to start:", err);

        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);

    process.exit(1);
  });
