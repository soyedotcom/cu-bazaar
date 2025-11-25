import mongoose, { mongo } from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter product name"],
    },
    price: {
      type: Number,
      required: [true, "Enter product price"],
    },
    sellerId: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Enter product category"],
    },
    quantity: {
      type: Number,
      required: [true, "Enter product quantity"],
      default: 0,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
