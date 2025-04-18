const Product = require('../models/product.model');

function findAllProducts() {
  const result = Product.find();
  return result;
};

function findOneProduct(product) {
  const result = Product.findOne({product: product});
  return result;
};

function findLastInsertedProduct() {
  
  try {
  const result = Product.find().sort({_id:-1}).limit(1);
  console.log("Success in finding last inserted product");
  return result[0];
  } catch(err) {
    console.log("Problem in finding last inserted product", err)
    return false;
  }
}

module.exports = { findAllProducts, findOneProduct, findLastInsertedProduct };