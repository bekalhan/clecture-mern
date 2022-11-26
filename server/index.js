import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import morgan from 'morgan';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("You have been connected to MongoDB");
}).catch((err)=>{
    console.log("Db connect error => ",err);
});

//middleware
app.use(morgan("dev"));
app.use(express.json()); // if you do request with postman or using web server if you do not use express.json you can not get the data

app.use("/api",authRoutes);
app.use('/api',categoryRoutes);

const port = process.env.PORT || 8000;

app.listen(8000,()=>{
    console.log(`server is running on port ${port}`);
});