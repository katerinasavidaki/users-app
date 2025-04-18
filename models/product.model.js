const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsSchema = new Schema({
  product: {type: String},
  cost: {type: Number},
  quantity: {type: Number,required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Product", productsSchema);