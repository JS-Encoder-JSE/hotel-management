import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import hotelsRoute from './routes/hotels.route.js';
import uploadRoute from './routes/upload.js';
import userRoute from "./routes/users.route.js";
import { fileURLToPath } from 'url';
// Manager Routes 
import roomRoute from './routes/Manager/room.routs.js';
import bookingRoute from './routes/Manager/booking.route.js'
import { url } from 'inspector';


dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STR, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});
//
// static file directory
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads')));

// routes
app.use('/users', userRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomRoute)
app.use('/booking',bookingRoute)
app.use('/', uploadRoute)

// Define your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
