import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { addStaticSubDashData } from "../controllers/subdashboard.controller.js";

const router = Router();

router.post("/add-subdashboard", addStaticSubDashData);
// router.post("/add-dashboard-table/:user_id", checkToken, addDashboardTable);
// router.get("/get-dashboard-info/:user_id", checkToken, getDashboardInfo);

export default router;
