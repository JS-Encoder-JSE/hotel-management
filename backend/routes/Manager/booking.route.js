import { Router } from "express";
import {
  addBooking,
  getBookingsByHotel,
  getBookingById,
  updateBooking,
  deleteBooking,
  getActiveBookingByRoomId,
  cancelBooking,
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
router.patch("/update-booking/:booking_id", checkToken, updateBooking);
router.get(
  "/get-checkoutinfo-by-room/:room_id",
  checkToken,
  getCheckoutInfoByRoom
);
router.post("/checkout", checkToken, checkedOut);
router.delete("/cancel-booking/:booking_id", cancelBooking);
// router.delete('/delete-booking/:booking_id', checkToken, deleteBooking);

export default router;
