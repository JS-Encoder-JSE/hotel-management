import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import {
  cashBack,
  makePayment,
} from "../controllers/hotel.balance.controller.js";

const router = Router();

router.post("/make-payment", checkToken, makePayment);
router.post("/cashback", checkToken, cashBack);

export default router;
