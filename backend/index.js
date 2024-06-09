import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
// import bodyParser from 'body-parser'
import SequelizeStore from 'connect-session-sequelize';
// import UserRoute from './routes/UserRoute.js';
// import ProductRoute from './routes/ProductRoute.js';
// import AuthRoute from './routes/AuthRoute.js';
dotenv.config();
// import router from './routes/index.js';
import Kehadiran from './models/KehadiranModel.js';
import userRoute from './routes/UserRoute.js';
import divisiRoute from './routes/DivisiRoute.js';
import authRoute from './routes/AuthRoute.js';
import kehadiranRoute from './routes/KehadiranRoutes.js';
import Users from './models/UserModel.js';
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await Users.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

// store.sync();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

// app.use(bodyParser.json());
app.use(express.json());
app.use(userRoute);
app.use(divisiRoute);
app.use(authRoute);
app.use(kehadiranRoute);

app.listen(3500, () => {
  console.log('Server up and running...');
});
