import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all products
// GET /api/products
// Public
const getProducts = asyncHandler (async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const products = await Product.find({...keyword})
   
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


// Delete product
// DELETE /api/products/:id
// Private Admin
const deleteProduct = asyncHandler (async (req, res) => {
  const product = await Product.findById(req.params.id)
   
if(product) {
  await product.remove()
  res.json({message: 'Product Removed '})
} else {
  res.status(404)
  throw new Error('Product not found')
}
})



// Create product
// Create /api/products
// Private Admin
const createProduct = asyncHandler (async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    writer: 'Sample writer',
    artist: 'Sample artist',
    publisher: 'Sample publisher',
    countInStock: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// Update product
// PUT /api/products/:id
// Private Admin
const updateProduct = asyncHandler (async (req, res) => {
  const {name, image, category, writer, artist, publisher, price, countInStock, description } = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name
    product.image = image
    product.category = category
    product.writer = writer
    product.artist = artist
    product.publisher = publisher
    product.price = price
    product.countInStock = countInStock
    product.description = description


    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Produt not found')
  }
})


    

export {
  getProducts, getProductById, getTopProducts, deleteProduct, updateProduct, createProduct
}