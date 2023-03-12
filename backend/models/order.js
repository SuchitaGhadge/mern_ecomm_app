const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);

const orderSchema = new mongoose.Schema(
  {
    products: [ProductInCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductInCart };
