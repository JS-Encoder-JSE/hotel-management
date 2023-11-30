import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { addStaticSubDashData, getSubDashboardInfo } from "../controllers/subdashboard.controller.js";

const router = Router();

router.post("/add-subdashboard", addStaticSubDashData);
// router.post("/add-dashboard-table/:user_id", checkToken, addDashboardTable);
router.get("/get-subdashboard-info/:user_id", checkToken, getSubDashboardInfo);

export default router;
