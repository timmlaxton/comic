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
const createStanding = asyncHandler (async (req, res) => {
  const standing = new Standing({
    name: 'Sample Name',
    user: req.user._id,
    address: 'Sample Title',
    contactNumber: 'Sample Nnumber',
    email: 'Sample artist',
    title: 'Sample publisher',
    publisher: 'Sample Publisher'
  })

  const createdStanding = await standing.save()
  res.status(201).json(createdStanding)
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
const updateStanding = asyncHandler (async (req, res) => {
  const {name, address, contactNumber, email, title, publisher } = req.body

  const standing = await Standing.findById(req.params.id)

  if(standing) {
    standing.name = name
    standing.address = address
    standing.contactNumber = contactNumber
    standing.email = email
    standing.title = title
    standing.publisher = publisher
    


    const updatedStanding = await standing.save()
    res.json(updatedStanding)
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


export {createStanding, getStandingOrderById, updateStanding, deleteStandingOrder, getStandingOrders }