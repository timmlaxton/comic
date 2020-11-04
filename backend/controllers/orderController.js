import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// Create New Order
// POST /api/products
// Privare
const addOrderItems = asyncHandler (async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice} = req.body

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('N order items')
    return
  } else {
    const order = new Order ({
      orderItems, 
      user: req.user._id,
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      shippingPrice, 
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

export {addOrderItems}