import express from 'express'
import dotenv from 'dotenv'
import { createDivisi, getDivisi, getDivisiById } from '../controllers/Divisi.js'
import { adminOnly, verifyUser } from '../middleware/AuthUser.js'
dotenv.config()

const divisiRoute = express.Router()

divisiRoute.get('/divisi', getDivisi)
divisiRoute.get('/divisi/:id', getDivisiById);
divisiRoute.post('/divisi', createDivisi);

export default divisiRoute;