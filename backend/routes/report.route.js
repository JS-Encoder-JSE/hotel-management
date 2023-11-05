import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { getReport } from "../controllers/report.controller.js";

const router = Router();

router.get("/get-report", checkToken, getReport);

export default router;
