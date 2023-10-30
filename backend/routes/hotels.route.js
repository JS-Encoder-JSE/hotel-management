import { Router } from "express";
import {

} from "../controllers/hotel.controller.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

// add room 
// router.post('/',checkToken,addRoom);

// router.post('/', );
// router.post("/", );
// router.post("/",);
// router.post("/users/add-manager", checkToken, addManager);
// router.get("/users/get-manager-by-id/:managerId", checkToken, getManagerById);
// router.get("/users/get-managers-by-owner", checkToken, getManagersByOwner);
// router.get("/users/get-owners", checkToken, getOwners);

export default router;