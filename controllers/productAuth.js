//Importing  models
const productSchema = require("../models/productAuth");

//To get all the product details
const getProduct = async (req, res) => {
  try {
    const searchTerm = req.query.search;    // Get the search term from the query string

    let productItms;
    if (searchTerm) {
      // If a search term is provided, perform a search based on that term
      productItms = await productSchema.find({ productname: { $regex: searchTerm, $options: 'i' } });
    } else {
      // If no search term, get all products
      productItms = await productSchema.find({});
    }

    return res.status(200).json({
      success: true,
      productItms,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

//To get specific product details 
const viewProduct = async (req, res) => {
  try {
    const productItmById = await productSchema.findOne({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      productItmById,
    });
  } catch (e) {
    console.log(e);
  }
};

//To create a product
const createProduct = async (req, res) => {
  console.log(req.body);
  const { productname, productdesc, price } = req.body;
  try {
    if (!productname || !productdesc || (!price && !req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "These Fields Are Mandatory",
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
      productdesc,
      price: numericPrice,
      files: filesData,
    });

    return res.status(200).json({
      success: true,
      message: 'Product added successfully',
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

//To update a product by Id
const updateProduct = async (req, res) => {
  try {
    const updateItemsId = await productSchema.findById({ _id: req.params.id });
    if (!updateItemsId) {
      return res.status(400).json({
        success: false,
        message: "Product not found to be updated",
      });
    }

    // Handle file upload if a file was sent in the request
    let filesData;
    if (req.files && req.files.length > 0) {
      filesData = req.files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        filePath: file.path,
        size: file.size,
      }));
    }

    // Update the product with the new data, including filesData if available
    const updateItems = await productSchema.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(filesData && { files: filesData }), // Add filesData to the update only if it exists
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Updating product details",
      updatedProduct: updateItems,
      
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error on updating product",
    });
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
        message: "Product not found to be deleted",
      });
    }
    const deleteItem = await productSchema.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: `Deleting ${deleteItem.productname}`,
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
  viewProduct
};
