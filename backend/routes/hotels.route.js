import { Router } from "express";
// import {

// } from "../controllers/hotel.controller.js";
import { checkToken } from "../middlewares/checkToken.js";
import { addHotel, getHotels } from "../controllers/hotel.controller.js";

const router = Router();

router.post("/add-hotel", checkToken, addHotel);
router.get("/get-hotels", checkToken, getHotels);

export default router;
