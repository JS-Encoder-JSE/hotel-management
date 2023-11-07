import { Router } from "express";
// import {

// } from "../controllers/hotel.controller.js";
import { checkToken } from "../middlewares/checkToken.js";
import { addHotel } from "../controllers/hotel.controller.js";

const router = Router();

router.post("/add-hotel", checkToken, addHotel);

export default router;