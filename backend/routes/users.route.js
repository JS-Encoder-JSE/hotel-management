import { Router } from "express";
import {
  addManager,
  addOwner,
  getManagerById,
  getManagersByOwner,
  getOwners,
  login,
  createSuperUser,
  getLoginUser,
  addLicense,
  addUser,
} from "../controllers/users.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/create-superuser", createSuperUser);
router.post("/add-user", addUser);
router.post("/users/add-owner", checkToken, addOwner);
router.post("/add-license", checkToken, addLicense);

router.post("/login", login);
router.get("/get-login-user", checkToken, getLoginUser);
router.post("/users/add-manager", checkToken, addManager);
router.get("/users/get-manager-by-id/:managerId", checkToken, getManagerById);
router.get("/users/get-managers-by-owner", checkToken, getManagersByOwner);
router.get("/users/get-owners", checkToken, getOwners);

export default router;
