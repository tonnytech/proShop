import express from "express";
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';

const router = express.Router()
 // @desc Fetch all products
 //@router Get/api/products
 //@access public

router.get('/', asyncHandler(async (req, res)=> {
    const products = await Product.find({})
    throw new Error ('Not authorized')
    res.json(products);
}))

// @desc Fetch single product
 //@router Get/api/products/:id
 //@access public

router.get('/:id', asyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
}));

export default router;
