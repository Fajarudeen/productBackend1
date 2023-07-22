const express = require("express");
const router = express.Router();

//package installing for file upload
const multer = require("multer");

//importing all functions from controller
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productAuth");

//Using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../backend study/html/product/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

//Creating different path for the application
router.get("/getItems", getProduct);
router.post("/", upload.array("files"), createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
