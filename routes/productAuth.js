//express installing
const express = require("express");
const router = express.Router();
const path = require('path');


//package installing for file upload
const multer = require("multer");
const app = express();

//importing all functions from controller
const {
  createProduct,
  getProduct,
  viewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productAuth");

//Using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

//Creating different path for the application
router.get("/getItems", getProduct);
router.get("/getItems/:id", viewProduct);
router.post("/",upload.array("files"),createProduct);
router.put("/updateProduct/:id", upload.array("files"), updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
