import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { addDashboard, addDashboardTable, getDashboardInfo } from "../controllers/dashboard.controller.js";

const router = Router();

router.post("/add-dashboard/:user_id", addDashboard);
router.post("/add-dashboard-table/:user_id", addDashboardTable);
router.get("/get-dashboard-info/:user_id", checkToken, getDashboardInfo);

export default router;
