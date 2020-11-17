import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById,updateOrderToPay, updateOrderToDelivered, getMyOrders, getOrders, createStanding, createOrder } from '../controllers/orderController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/standing').post(protect, createStanding)
router.route('/order').post(protect, createOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPay)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)



export default router