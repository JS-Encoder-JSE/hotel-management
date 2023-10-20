import { Router } from "express";
import {
  addManager,
  addOwner,
  getManagerById,
  getManagersByOwner,
  getOwners,
  login,
} from "../controllers/users.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/users/add-owner", checkToken, addOwner);
router.post("/users/login", login);
router.post("/users/add-manager", checkToken, addManager);
router.get("/users/get-manager-by-id/:managerId", checkToken, getManagerById);
router.get("/users/get-managers-by-owner", checkToken, getManagersByOwner);
router.get("/users/get-owners", checkToken, getOwners);

export default router;
