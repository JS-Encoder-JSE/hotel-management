import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { getAllReport, getReport } from "../controllers/report.controller.js";

const router = Router();

router.get("/get-report", checkToken, getReport);
router.get("/get-all-report", checkToken, getAllReport);

export default router;
