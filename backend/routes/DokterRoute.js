import express from 'express'
import dotenv from 'dotenv'
import { adminOnly, verifyUser,  } from '../middleware/AuthUser.js'
import { createDokter, deleteDokter, getDokter, getDokterById, getDokterBySpesialist, updateDokter } from '../controllers/Dokter.js'
dotenv.config()

const dokterRoute = express.Router()

dokterRoute.get('/dokter', verifyUser, adminOnly, getDokter)
dokterRoute.get('/dokter/spesialist/:spesialistId', verifyUser, getDokterBySpesialist)
dokterRoute.get('/dokter/:id', verifyUser, adminOnly, getDokterById);
dokterRoute.post('/dokter', verifyUser, adminOnly, createDokter);
dokterRoute.patch('/dokter/:id', verifyUser, updateDokter);
dokterRoute.delete('/dokter', verifyUser, adminOnly, deleteDokter);

export default dokterRoute