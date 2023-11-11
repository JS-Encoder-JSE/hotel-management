import { Router } from "express";
import {
  addFood,
  //   getFood,
  getfoodById,
  addOrder,
  getFoodByHotelId,
  deleteFood,
  deleteOrder,
  getOrdersByHotelId,
  updateFood,
} from "../../controllers/Manager/food.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// add room
router.post("/add-food", checkToken, addFood);
// router.get("/get-food", checkToken, getFood);
router.get("/get-foods-by-hotel/:hotel_id", checkToken, getFoodByHotelId);
router.get("/get-orders-by-hotel/:hotel_id", checkToken, getOrdersByHotelId);
router.get("/get-food-by-id/:foodId", checkToken, getfoodById);
router.patch("/update-food/:food_id", checkToken, updateFood);
router.delete("/delete-food/:food_id", checkToken, deleteFood);
router.delete("/delete-order/:order_id", checkToken, deleteOrder);
router.post("/add-order", checkToken, addOrder);

export default router;
