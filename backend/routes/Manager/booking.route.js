import { Router } from "express";
import {
  addBooking,
  getBookingsByHotel,
  getBookingById,
  updateBooking,
  deleteBooking,
  getActiveBookingByRoomId,
  cancelBooking,
  getBookingDetailsById,
} from "../../controllers/Manager/booking.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";
import {
  checkedOut,
  getCheckoutInfoByRoom,
} from "../../controllers/Manager/checkout.controller.js";

const router = Router();

// add room
router.post("/add-booking", checkToken, addBooking);
router.get("/get-bookings-by-hotel", checkToken, getBookingsByHotel);
router.get("/get-booking-by-id/:booking_id", checkToken, getBookingById);
router.get("/get-active-booking-by-room/:room_id", getActiveBookingByRoomId);
router.get(
  "/get-booking-details/:booking_id",
  checkToken,
  getBookingDetailsById
);
router.patch("/update-booking/:booking_id", checkToken, updateBooking);
router.get(
  "/get-checkoutinfo-by-rooms",
  checkToken,
  getCheckoutInfoByRoom
);
router.post("/checkout", checkToken, checkedOut);
router.delete("/cancel-booking/:booking_id", checkToken, cancelBooking);
// router.delete('/delete-booking/:booking_id', checkToken, deleteBooking);

export default router;
