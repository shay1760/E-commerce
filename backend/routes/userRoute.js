import express from 'express'
import { registerUser, userLogin, adminLogin } from '../controllers/userController.js'

const userRouter=express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', userLogin)
userRouter.post('/admin/login', adminLogin)

export default userRouter