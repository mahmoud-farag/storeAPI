import express from 'express';
import { getAllProducts, getProductsStatic } from '../controllers/productController.js';

const productRoute = express.Router();


productRoute.route('/').get(getAllProducts);
productRoute.route('/static').get(getProductsStatic);


export {productRoute};