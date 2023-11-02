import { Router } from "express";
import {
  getCheckoutReport
} from "../../controllers/Manager/report.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// add room 
router.get('/get-checkout-report', checkToken, getCheckoutReport);




export default router;