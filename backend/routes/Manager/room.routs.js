import { Router } from "express";
import {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} from "../../controllers/Manager/room.controller.js";
import { checkToken } from "../../middlewares/checkToken.js";

const router = Router();

// add room 
router.post('/add-room', checkToken, addRoom);
router.get('/get-room-by-id/:roomId', checkToken, getRoomById);
router.get('/get-room', checkToken, getAllRooms);
router.patch('/update-room/:roomId', checkToken, updateRoom);
router.delete('/delete-room/:roomId',checkToken,deleteRoom)




export default router;