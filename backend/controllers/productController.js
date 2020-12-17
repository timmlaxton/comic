import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all products
// GET /api/products
// Public
const getProducts = asyncHandler (async (req, res) => {

  let config = {}
  
  if (req.query.keyword) {
    config.name = {
      $regex: req.query.keyword,
      $options: 'i'
    }
  }

  if (req.query.category) {
    config.category = {
      $regex: req.query.category,
      $options: 'i'
    }
  }

  

  const products = await Product.find({...config})
   
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
  const {name, issue, image, category, writer, artist, publisher, price, featured, countInStock, description } = req.body
  const product = new Product({
    name,
    issue,
    price,
    user: req.user._id,
    image,
    category,
    writer,
    artist,
    publisher,
    countInStock,
    description,
    featured
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// Update product
// PUT /api/products/:id
// Private Admin
const updateProduct = asyncHandler (async (req, res) => {
  const {name, issue, image, category, writer, featured, artist, publisher, price, countInStock, description } = req.body

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name
    product.issue = issue    
    product.category = category
    product.writer = writer
    product.artist = artist
    product.publisher = publisher
    product.price = price
    product.countInStock = countInStock
    product.description = description
    product.featured = featured

    if (image) {
      product.image = image
    }


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