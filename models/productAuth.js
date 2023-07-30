//mongoose installing
const mongoose = require("mongoose");

//creating Schema for db
const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: [true, "please add the product name"],
    },
    productdesc: {
      type: String,
      required: [true, "please add the product description"],
    },
    price: {
      type: Number,
      required: [true, "please add the  price"],
    },
    files: [
      {
        filename: {
          type: String,
          required: [true, "please add the filename"],
        },
        originalName: {
          type: String,
          required: [true, "please add the original filename"],
        },
        filePath: {
          type: String,
          required: [true, "please add the file path"],
        },
        size: {
          type: Number,
          required: [true, "please add the file size"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);
