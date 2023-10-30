import { Router } from "express";
import {
    addBooking, getBooking, getBookingById, updateBooking
} from "../../controllers/Manager/booking.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// add room 
router.post('/add-booking', checkToken, addBooking);
router.get('/get-booking', checkToken, getBooking);
router.get('/get-booking-by-id/:bookingId', checkToken, getBookingById);
router.patch('/update-booking/:bookingId', checkToken, updateBooking);




export default router;