import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Corrected: `type` should be `Number` not `type, Number`
    image: { type: Array, required: true }, // Changed to an array of strings for better type safety
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true }, // Changed to an array of strings
    bestSeller: { type: Boolean, default: false } // Added default value for bestSeller
});

// Ensure that the model is either created or reused
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
