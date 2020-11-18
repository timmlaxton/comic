import express from 'express'
const router = express.Router()
import { createStandingOrder, getStandingOrderById, updateStandingOrder, deleteStandingOrder, getStandingOrders } from '../controllers/standingController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getStandingOrders).post(protect, admin, createStandingOrder)
router.route('/:id').get(getStandingOrderById).delete(protect, admin, deleteStandingOrder).put(protect, updateStandingOrder)


export default router