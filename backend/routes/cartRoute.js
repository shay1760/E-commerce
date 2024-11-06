import express from 'express'
import { addToCart, updateCart, userCart } from '../controllers/cartController.js'
import authUser from '../middlewares/auth.js'

const cartRouter=express.Router()

cartRouter.post('/get', authUser ,userCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)

export default cartRouter