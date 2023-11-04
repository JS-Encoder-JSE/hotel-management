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
  updateStatus,
  renewLicense,
  getOwnersByAdmin,
  updateUserField,
} from "../controllers/users.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/create-superuser", createSuperUser);
router.post("/add-user", checkToken, addUser);
router.post("/add-owner", checkToken, addOwner);
router.post("/add-license", checkToken, addLicense);
router.patch("/update-status", checkToken, updateStatus);
router.patch("/update-field", checkToken, updateUserField);
router.patch("/renew-license", checkToken, renewLicense);

router.post("/login", login);
router.get("/get-login-user", checkToken, getLoginUser);
router.post("/add-manager", checkToken, addManager);
router.get("/get-manager-by-id/:managerId", checkToken, getManagerById);
router.get("/get-managers-by-owner", checkToken, getManagersByOwner);
router.get("/get-owners", checkToken, getOwners);
router.get("/get-owners-by-admin", checkToken, getOwnersByAdmin);

export default router;
