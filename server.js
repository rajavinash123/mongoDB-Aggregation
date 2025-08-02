// server.js
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bookRoutes = require("./routes/book-routes");

const productRoutes = require("./routes/product-routes");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((e) => {
    console.error("Database connection failed:", e);
  });

app.use(express.json());

// Tell your app to use the routes from your router fil

app.use("/products", productRoutes);
app.use('/reference',bookRoutes)//book or reference

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});