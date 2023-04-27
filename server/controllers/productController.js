const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

//CREATE PRODUCT
const createProduct = asyncHandler(async (req, res, next) => {
  const { name, sku, category, quantity, price, description } = req.body;

  //validation
  if (!name || !category || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    try {
      fileData = {
        fileName: req.file.originalname + Date.now().toString(),
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: req.file.path,
      };
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  //create product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });
  res.status(201).json(product);
});

//GET ALL PRODUCTS
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  // if(products.length===0){
  //     res.status(400);
  //     throw new Error("No any Products");
  // }
  // console.log(products);
  res.status(200).json(products);
});

//GET SINGLE PRODUCT
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  console.log("singleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  console.log(product);
  //if product does not exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  //Match product to its user
  if (product.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

//DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  //if product does not exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  //Match product to its user
  if (product.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted" });
});

//UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res, next) => {
  const { name, sku, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  //if product does not exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  //Match product to its user
  if (product.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    try {
      fileData = {
        fileName: req.file.originalname + Date.now().toString(),
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        filePath: req.file.path,
      };
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct };
