import { Router } from "express";
// import {

// } from "../controllers/hotel.controller.js";
import { checkToken } from "../middlewares/checkToken.js";
import { addHotel, getHotelById, getHotelsByManagerId, getHotels, updateHotel } from "../controllers/hotel.controller.js";

const router = Router();

router.post("/add-hotel", checkToken, addHotel);
router.get("/get-hotels", checkToken, getHotels);
router.get("/get-hotel-by-id/:hotel_id", checkToken, getHotelById);
router.get("/get-hotel-by-manager/:manager_id", checkToken, getHotelsByManagerId);
router.patch("/update-hotel/:hotel_id", checkToken, updateHotel);

export default router;
