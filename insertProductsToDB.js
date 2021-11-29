import { connectToDB } from "./db/connectToDB.js"
// import { asyncWrapper } from "./middleware/AsyncWrapper.js";
import { Product } from "./models/product.js";
import dotenv from 'dotenv';
dotenv.config();


import productsData from './products.js' 

// console.log(productsArray);

const insert = async()=>{
    try {
        await connectToDB(process.env.MONGODB_URI);
         console.log('connected to DB')
        await Product.deleteMany();
         console.log('all previuos data was removed');
        await Product.insertMany(productsData)
        console.log('inserted')
        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
    
}

insert()