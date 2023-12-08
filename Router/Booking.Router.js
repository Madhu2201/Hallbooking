import express from 'express'
import {CreateHallBooking, getdetail, GetRoomdata, GetCustomerData, getCustomerMulBookings} from "../Controller/Booking.controller.js";
const router =express.Router()

router.get('/data',getdetail)
router.post('/booking/create',CreateHallBooking)
router.get('/get/roomdata',GetRoomdata)
router.get('/get/customer',GetCustomerData)
router.get('/data/count',getCustomerMulBookings)

export default router;
