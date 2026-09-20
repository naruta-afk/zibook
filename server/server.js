import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';

import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';



const app = express(); // Create an instance of the Express application

const port = process.env.PORT || 5000; // Set the port for the server

await  connectDB() // Connect to the database

await connectCloudinary(); // Connect to Cloudinary

//Allow multiple origins 
const allowedOrigins = ['http://localhost:5173'];
// Middleware setup 
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // cookies-parser moddleware
app.use(cors({
    origin: allowedOrigins,// whitelist of allowed origins
    credentials: true, // Allow cookies to be sent with requests
}))



// Routes

app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/product',productRouter);



// Root routeendpoint to check QPI status
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
//
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});