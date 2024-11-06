import express from 'express'
import { allOrders, userOrder, updateStatus, placeOrder, placeOrderStripe, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const orderRouter=express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

orderRouter.post('/userorders', authUser, userOrder)

orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter