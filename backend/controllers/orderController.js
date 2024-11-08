import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js';
import Stripe from 'stripe'

const currency='inr'
const deliveryCharge=60

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//place orders using COD
const placeOrder=async(req, res)=>{

    try {
        const {userId, items, amount, address}=req.body;

        const orderData={
            userId, 
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            data: Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success:true, message:"Order placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

//place orders using stripe
const placeOrderStripe=async(req, res)=>{
    try {
        
        const {userId, items, amount, address}=req.body
        const {origin}=req.headers;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()

        const line_items=items.map((item)=>({
            price_data: {
                currency: currency,
                product_data:{
                    name: item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery charge'
            },
            unit_amount: deliveryCharge*100
        },
        quantity:1
    })

    const session=await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment',
    })
    res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})  
    }
}

const verifyStripe=async(req, res)=>{
    const {orderId, success, userId}=req.body

    try {
        if(success==='true')
        {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true});
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//All order data for admin
const allOrders=async(req, res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//User data 
const userOrder=async(req, res)=>{
    try {
        const {userId}=req.body

        const orders=await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//update order status
const updateStatus=async(req, res)=>{
    try {
        const {orderId, status}=req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {placeOrder, placeOrderStripe , allOrders, userOrder, updateStatus, verifyStripe}