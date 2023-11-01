import { Router } from "express";
import {
    addfood, getfood, getfoodById, updatefood,deletefood,addOrder
} from "../../controllers/Manager/food.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// add room 
router.post('/add-food', checkToken, addfood);
router.get('/get-food', checkToken, getfood);
router.get('/get-food-by-id/:foodId', checkToken, getfoodById);
router.patch('/update-food/:foodId', checkToken, updatefood);
router.delete('/delete-food/:foodId', checkToken, deletefood);
router.post('/add-order',checkToken,addOrder)

export default router;