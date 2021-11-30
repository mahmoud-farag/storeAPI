import express from 'express';
import dotenv from 'dotenv';


import { homeRoute } from './middleware/homeRoute.js';
import { notFound } from './middleware/not-found.js';
import { startApp } from './middleware/startApp.js';
import { productRoute } from './routes/productRoute.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

// extra security packages
import helmet from 'helmet';
import cors from 'cors';
import  xss from 'xss-clean';
import  rateLimit from 'express-rate-limit';


// sawgger docs 
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';


const app = express(),
      PORT = process.env.PORT || 5000,
      swaggerDocument = YAML.load('./swagger.yaml');


dotenv.config()
// app security modules 
app.set('trust proxy', 1);
app.use(
    rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// middleware

app.get('/', (req,res)=>{

    res.status(200).send('<h1>Hello, your API is ready for the Fire Works online</h1> <a href="/api-docs">DOCUMENTATION</a> ')
})

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup((swaggerDocument)));
app.get('/',homeRoute)
app.use('/api/v1/products', productRoute)

app.use(notFound)
app.use(errorHandlerMiddleware)

// fire your app 
startApp(app, PORT)