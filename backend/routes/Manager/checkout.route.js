import { Router } from "express";

import { checkToken } from "../../middlewares/checkToken.js";
import { addCheckoutData } from "../../controllers/Manager/checkout.controller.js";

const router = Router();

router.post("/add-checkout-data", checkToken, addCheckoutData);

export default router;
