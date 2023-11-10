import { Router } from "express";
import { checkToken } from "../../middlewares/checkToken.js";
import {
  addItem,
  assignItemsToRoom,
  deleteItem,
  getItemsByHotelId,
  updateItem,
} from "../../controllers/Manager/item.controller.js";

const router = Router();

router.post("/add-item", checkToken, addItem);
router.post("/assign-items-to-room", checkToken, assignItemsToRoom);
router.get("/get-items-by-hotel/:hotel_id", checkToken, getItemsByHotelId);
router.patch("/update-item/:item_id", checkToken, updateItem);
router.delete("/delete-item/:item_id", checkToken, deleteItem);
export default router;
