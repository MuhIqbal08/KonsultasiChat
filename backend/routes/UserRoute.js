import express from 'express'
import dotenv from 'dotenv'
import { createUser, deleteUser, getUser, getUserById, updateUser } from '../controllers/Users.js'
import { adminOnly, verifyUser } from '../middleware/AuthUser.js'
dotenv.config()

const userRoute = express.Router()

userRoute.get('/users', verifyUser, adminOnly, getUser)
userRoute.get('/users/:id', verifyUser, adminOnly, getUserById);
userRoute.post('/users', createUser);
userRoute.patch('/users', verifyUser, adminOnly, updateUser);
userRoute.delete('/users', verifyUser, adminOnly, deleteUser);

export default userRoute