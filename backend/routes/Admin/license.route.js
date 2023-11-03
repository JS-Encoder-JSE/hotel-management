import { Router } from "express";
import { checkToken } from "../../middlewares/checkToken.js";
import { addLicense } from "../../controllers/Admin/license.controller.js";


const router = Router();

router.post("/add-license", checkToken, addLicense);



export default router;