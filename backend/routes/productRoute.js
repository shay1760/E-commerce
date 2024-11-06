import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminAuth.js';

const productRouter = express.Router();

// Route to add a product with multiple images
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
]), addProduct);

// Route to list products
productRouter.get('/list', listProducts);

// Route to remove a product by ID
productRouter.delete('/remove/:id', adminAuth, removeProduct);

// Route to get a single product by ID
productRouter.get('/single/:id', singleProduct);

export default productRouter;
