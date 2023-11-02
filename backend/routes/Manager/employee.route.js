import { Router } from "express";
import { checkToken } from "../../middlewares/checkToken.js";
import { addEmployee, deleteEmployee, getAllEmployees, updateEmployee ,getEmployeeById} from "../../controllers/Manager/employee.controller.js";

const router = Router();

router.post("/add-employee",checkToken, addEmployee);
router.get("/get-employees", checkToken, getAllEmployees);
router.get('/get-employee-by-id',checkToken,getEmployeeById)
router.patch("/update-employee/:id",checkToken, updateEmployee);
router.delete("/delete-employee/:id",checkToken, deleteEmployee);
export default router;