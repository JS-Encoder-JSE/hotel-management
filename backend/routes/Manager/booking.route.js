import { Router } from "express";
import {
    addBooking, getBookingsByHotel, getBookingById, updateBooking,deleteBooking
} from "../../controllers/Manager/booking.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// add room 
router.post('/add-booking', checkToken, addBooking);
router.get('/get-bookings-by-hotel/:hotel_id', checkToken, getBookingsByHotel);
router.get('/get-booking-by-id/:booking_id', checkToken, getBookingById);
router.patch('/update-booking/:booking_id', checkToken, updateBooking);
// router.delete('/delete-booking/:booking_id', checkToken, deleteBooking);





export default router;