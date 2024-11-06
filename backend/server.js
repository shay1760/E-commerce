import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
//import { userLogin } from './controllers/userController.js'

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
 

app.use('/api/v1/user', userRouter)
//app.use('/api/v1/login', userLogin)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', orderRouter)

app.get('/', (req, res)=>{
    res.send("Api working")
})

app.listen(port, ()=>
console.log(`Server running on ${port}`))