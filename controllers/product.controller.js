const Product = require('../models/product.model');
const productService = require('../services/product.services');

const logger = require('../logger/logger');

exports.findAllProducts = async(req, res) => {
  console.log("Find all products from products collection");

  try {
    const result = await productService.findAllProducts();
    
    if (!result) {
      res.status(404).json({status: false, data: "Products not found"});
    } else {
      res.status(200).json({status: true, data: result});
    }
  } catch(err) {
    console.log("Problem in finding products", err);
    res.status(400).json({status: false, data: err});
  }
};

exports.findOneProduct = async(req, res) => {
  console.log("Find product with specific product name");

  let product = req.params.product;

  try {
    const result = await productService.findOneProduct(product);

    if (!result) {
      console.log(`Product with ${product} name was not found`);
      res.status(404).json({status: false, data: `Product with ${product} name was not found`});
    } else {
      res.status(200).json({status: true, data: result});
    }
  } catch(err) {
    console.log("Problem in finding product", err)
    res.status(400).json({status: false, data: err});
  }
};

exports.createProduct = async(req, res) => {
  console.log("Creating a product");

  let data = req.body;

  const newProduct = new Product({
    product: data.product,
    cost: data.cost,
    description: data.description,
    quantity: data.quantity
  });

  try {
    const result = await newProduct.save();

    if (!result) {
      res.status(404).json({status: false, data: "Product not created"});
    } else {
      res.status(200).json({status: true, data: result});
    }
  } catch(err) {
    console.log("Problem in creating product", err);
    res.status(400).json({status: false, data: err});
  }
};

exports.deleteProductById = async(req, res) => {
  const id = req.params._id;
  console.log("Delete product with id", id);

  try {
    const result = await Product.findOneAndDelete({_id: id});

    if (!result) {
      res.status(404).json({status: false, data: `Product with id ${id} not found for delete`});
    } else {
      res.status(200).json({status: true, data: result});
    }
  } catch(err) {
    console.log(`Problem in deleting product with id ${id}`, err);
    res.status(400).json({status: false, data: err});
  }
};

exports.update = async(req, res) => {
  const product = req.body.product

  console.log(`Update product with name ${product}`);

  const updatedProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  };

  try {
    const result = await Product.findOneAndUpdate({product: product}, updatedProduct, {new: true});

    if (!result) {
      console.log(`Product with name ${product} was not updated`);
      res.status(404).json({status: false, data: `Product with name ${product} was not found for update`});
    } else {
      res.status(200).json({status: true, data: result});
    }
  } catch(err) {
    res.status(400).json({status: false, data: err});
  }
};