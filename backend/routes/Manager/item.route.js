import { Router } from "express";
import { checkToken } from "../../middlewares/checkToken.js";
import { addItem, deleteItem, getAllItems, updateItem } from "../../controllers/Manager/item.controller.js";

const router = Router();

router.post("/add-item",checkToken, addItem);
router.get("/get-items",checkToken, getAllItems);
router.patch("/update-item/:id",checkToken, updateItem);
router.delete("/delete-item/:id",checkToken, deleteItem);
export default router;