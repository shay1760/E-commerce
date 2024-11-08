import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middleware setup
app.use(express.json());
app.use(cookieParser());  // For handling cookies
app.use(cors({
    origin: process.env.CLIENT_URL,  // Set allowed origin from .env
    credentials: true,  // Allow cookies in cross-origin requests
}));

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);

// Root route
app.get('/', (req, res) => {
    res.send("API is working");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
