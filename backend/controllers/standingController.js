import asyncHandler from 'express-async-handler'
import Standing from '../models/standingModel.js'


// Fetch all standing orders
// GET /api/standings
// Public
const getStandingOrders = asyncHandler (async (req, res) => {
  

  const standings = await Standing.find()
   
  res.json(standings)
})

// Create standing order
// POST /api/standingorders
// Private 
const createStandingOrder = asyncHandler (async (req, res) => {
  const standing = new Standing({
    name: 'Sample Name',
    user: req.user._id,
    address: 'Sample Title',
    contactNumber: 'Sample writer',
    email: 'Sample artist',
    title: 'Sample publisher',
    publisher: 'Sample Publisher'
  })

  const createdStandingOrder = await standing.save()
  res.status(201).json(createdStandingOrder)
})

// Fetch single standing
// GET /api/standing/:id
// Public
const getStandingOrderById = asyncHandler (async (req, res) => {
  const standing = await Standing.findById(req.params.id)
  
    if(standing) {
      res.json(standing)
    } else {
      res.status(404)
      throw new Error('Standing order not found')
    }
})


// Update standing
// PUT /api/standings/:id
// Private Admin
const updateStandingOrder = asyncHandler (async (req, res) => {
  const {name, address, contactNumber, email, title, publisher } = req.body

  const standing = await Standing.findById(req.params.id)

  if(standing) {
    standing.name = name
    standing.address = address
    standing.contactNumber = contactNumber
    standing.email = email
    standing.title = title
    standing.publisher = publisher
    


    const updatedStandingOrder = await standing.save()
    res.json(updatedStandingOrder)
  } else {
    res.status(404)
    throw new Error('Standing Order not found')
  }
})

// Delete standing
// DELETE /api/standing
// Private Admin
const deleteStandingOrder = asyncHandler (async (req, res) => {
  const standing = await Standing.findById(req.params.id)
   
if(standing) {
  await standing.remove()
  res.json({message: 'Standing Order Removed '})
} else {
  res.status(404)
  throw new Error('Standing order not found')
}
})


export {createStandingOrder, getStandingOrderById, updateStandingOrder, deleteStandingOrder, getStandingOrders }