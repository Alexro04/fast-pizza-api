const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Pizza name is required"],
    trim: true,
    maxLength: [100, "Pizza name cannot exceed 100 characters"],
  },
  unitPrice: {
    type: Number,
    required: [true, "Pizza price is required"],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, "Pizza name is required"],
    trim: true,
  },
  ingredients: {
    type: Array,
    required: [true, "Pizza ingredients are required"],
  },
  soldOut: {
    type: Boolean,
    required: [true, "Is pizza available?"],
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
