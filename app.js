import express from 'express';
import dotenv from 'dotenv';


import { homeRoute } from './middleware/homeRoute.js';
import { notFound } from './middleware/not-found.js';
import { startApp } from './middleware/startApp.js';
import { productRoute } from './routes/productRoute.js';

const app = express(),
      PORT = process.env.PORT || 5000;


dotenv.config()

app.get('/',homeRoute)
app.use('/api/v1/products', productRoute)

app.use(notFound)
// app.use(errorHandlerMiddleware)

// fire your app 
startApp(app, PORT)