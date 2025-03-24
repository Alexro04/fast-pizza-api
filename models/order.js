const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
    maxLength: [100, "Customer name cannot exceed 100 characters"],
  },
  status: {
    type: String,
    required: [true, "Order status is required"],
    trim: true,
  },
  priority: {
    type: Boolean,
    required: [true, "Priority status is required"],
    trim: true,
  },
  cart: {
    type: Array,
    required: [true, "Cart items to be ordered are required"],
  },
  estimatedDelivery: {
    type: Date,
    required: [true, "Please specify the estimated delivery time"],
  },
  orderPrice: {
    type: Number,
    required: [true, "Please specify the total price of order"],
  },
  priorityPrice: {
    type: Number,
    required: [true, "Please specify the price of priority if it's given"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
