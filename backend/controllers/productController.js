import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all products
// GET /api/products
// Public
const getProducts = asyncHandler (async (req, res) => {
  const products = await Product.find({})
   
  res.json(products)
})


// Fetch single product
// GET /api/products/:id
// Public
const getProductById = asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id)
  
    if(product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})

// Get top products
// GET /api/products/top
// Public
const getTopProducts = asyncHandler (async (req, res) => {
  const products = await Product.find({}).limit(6)

  res.json(products)
})
    

export {
  getProducts, getProductById, getTopProducts
}