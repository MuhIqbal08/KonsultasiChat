import express from 'express'
import dotenv from 'dotenv'
import { Login, LoginDokter, logOut, Me } from '../controllers/Auth.js'
dotenv.config()

const authRoute = express.Router()

authRoute.get('/me', Me)
authRoute.post('/login', Login)
authRoute.post('/login/dokter', LoginDokter)
authRoute.delete('/logout', logOut)

export default authRoute;