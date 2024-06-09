import express from 'express'
import dotenv from 'dotenv'
import { verifyUser } from '../middleware/AuthUser.js'
import { createKehadiran, deleteKehadiran, getKehadiran, getKehadiranById, updateKehadiran } from '../controllers/Kehadiran.js'
dotenv.config()

const kehadiranRoute = express.Router()

kehadiranRoute.get('/kehadiran', verifyUser, getKehadiran)
kehadiranRoute.get('/kehadiran/:id', verifyUser, getKehadiranById);
kehadiranRoute.post('/kehadiran', verifyUser, createKehadiran);
kehadiranRoute.patch('/kehadiran', verifyUser, updateKehadiran);
kehadiranRoute.delete('/kehadiran', verifyUser, deleteKehadiran);

export default kehadiranRoute