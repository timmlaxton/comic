import express from 'express'
const router = express.Router()
import { createStanding, getStandingOrderById, updateStanding, deleteStandingOrder, getStandingOrders } from '../controllers/standingController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getStandingOrders).post(protect, admin, createStanding)
router.route('/:id').get(getStandingOrderById).delete(protect, admin, deleteStandingOrder).put(protect, admin, updateStanding)


export default router