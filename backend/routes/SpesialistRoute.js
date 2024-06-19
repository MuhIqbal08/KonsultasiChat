import express from 'express'
import dotenv from 'dotenv'
import { createSpesialist, deleteSpesialist, getSpesialist, getSpesialistById, updateSpesialist } from '../controllers/Spesialist.js'
import { adminOnly, verifyUser } from '../middleware/AuthUser.js'
dotenv.config()

const spesialistRoute = express.Router()

spesialistRoute.get('/spesialist', verifyUser, getSpesialist)
spesialistRoute.get('/spesialist/:id', adminOnly, verifyUser, getSpesialistById);
spesialistRoute.post('/spesialist', adminOnly, verifyUser, createSpesialist);
spesialistRoute.patch('/spesialist/:id', adminOnly, verifyUser, updateSpesialist);
spesialistRoute.delete('/spesialist/:id', adminOnly, verifyUser, deleteSpesialist);

export default spesialistRoute;