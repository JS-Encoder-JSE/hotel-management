import { Router } from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { addExpense, getExpenses, updateExpense } from "../controllers/expense.controller.js";


const router = Router();

router.post("/add-expense", checkToken, addExpense);
// router.post("/assign-items-to-room", checkToken, assignItemsToRoom);
// router.get("/get-item-by-id/:item_id", checkToken, getItemById);
router.get("/get-expenses", checkToken, getExpenses);
router.patch("/update-expense/:expense_id", checkToken, updateExpense);
// router.delete("/delete-item/:item_id", checkToken, deleteItem);
export default router;
