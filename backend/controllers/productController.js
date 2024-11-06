import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const images = [
            req.files.image1 ? req.files.image1[0] : null,
            req.files.image2 ? req.files.image2[0] : null,
            req.files.image3 ? req.files.image3[0] : null,
            req.files.image4 ? req.files.image4[0] : null,
            req.files.image5 ? req.files.image5[0] : null
        ].filter(item => item !== null);

        // If no images are provided, return an error
        if (images.length === 0) {
            return res.status(400).json({ success: false, message: 'No images provided' });
        }

        // Upload images to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl, // Use 'image' as per your schema
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true"
        };
        //console.log(sizes); // Check the value of sizes before parsing

        const product = new productModel(productData);
        await product.save();

        // Send response once, after the product has been successfully added
        return res.status(201).json({ success: true, message: 'Product added successfully' });
        
    } catch (error) {
        console.error(error);

        // Only send a response if none has been sent yet
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

const listProducts=async(req, res)=>{

    try {
        const products=await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const singleProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const result = await productModel.findByIdAndDelete(productId);
        if (!result) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


export {listProducts, addProduct, removeProduct, singleProduct}

  
