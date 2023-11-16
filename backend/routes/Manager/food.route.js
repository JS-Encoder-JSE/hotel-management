import { Router } from "express";
import {
  addFood,
  getfoodById,
  addOrder,
  getFoodByHotelId,
  deleteFood,
  deleteOrder,
  getOrdersByHotelId,
  updateFood,
  getFoodCategoriesByHotelId,
  addFoodCategory,
  updateFoodCategory,
  deleteFoodCategory,
  getFoodCategoryById,
  updateOrder,
} from "../../controllers/Manager/food.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// Food routes
router.post("/add-food", checkToken, addFood);
router.get("/get-foods-by-hotel/:hotel_id", checkToken, getFoodByHotelId);
router.get("/get-orders-by-hotel/:hotel_id", checkToken, getOrdersByHotelId);
router.get("/get-food-by-id/:foodId", checkToken, getfoodById);
router.patch("/update-food/:food_id", checkToken, updateFood);
router.delete("/delete-food/:food_id", checkToken, deleteFood);
router.delete("/delete-order/:order_id", checkToken, deleteOrder);
router.post("/add-order", checkToken, addOrder);
router.patch("/updare-order", checkToken, updateOrder);

// Food category routes
router.get("/get-food-categories-by-hotel/:hotel_id", checkToken, getFoodCategoriesByHotelId);
router.get("/get-food-category-by-id/:category_id", checkToken, getFoodCategoryById);
router.post("/add-food-category", checkToken, addFoodCategory);
router.patch("/update-food-category/:category_id", checkToken, updateFoodCategory);
router.delete("/delete-food-category/:category_id", checkToken, deleteFoodCategory);

export default router;
