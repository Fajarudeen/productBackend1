//Importing  models
const productSchema = require("../models/productAuth");

//To get all the product details
const getProduct = async (req, res) => {
  try {
    const productItms = await productSchema.find({});

    return res.status(200).json({
      success: true,
      productItms,
    });
  } catch (e) {
    console.log(e);
  }
};


//To create a product
const createProduct = async (req, res) => {
  console.log(req.body);
  const { productname, price } = req.body;
  try {
    if (!productname || (!price && !req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "These Fields Are Mandinatory",
      });
    }
    
    const numericPrice = parseInt(price, 10);

    const filesData = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      size: file.size,
    }));

    console.log(filesData);

    let extProduct = await productSchema.findOne({ productname: productname });
    if (extProduct) {
      return res.status(400).json({
        success: false,
        message: "This product Already Exists",
      });
    }

    const products = await productSchema.create({
      productname,
      price: numericPrice,
      files: filesData,
    });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};


//To update a product by id
const updateProduct = async (req, res) => {
  try {
    const updateItemsId = await productSchema.findById({ _id: req.params.id });
    if (!updateItemsId) {
      return res.status(400).json({
        success: false,
        message: "Invalid id cant update products",
      });
    }

    const updateItems = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      updateItems,
    });
  } catch (error) {
    console.log(error);
  }
};


//To delete a product by id
const deleteProduct = async (req, res) => {
  try {
    const deleteProductId = await productSchema.findById({
      _id: req.params.id,
    });
    if (!deleteProductId) {
      return res.status(400).json({
        success: false,
        message: "Invalid id cant delete product",
      });
    }

    const deleteItem = await productSchema.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: `${deleteItem}->This item is deleted`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
