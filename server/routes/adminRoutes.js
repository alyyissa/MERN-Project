import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post('/changerole', protect, changeRoleToOwner)
adminRouter.post('/add-carrr', upload.single("image"), protect, addCar)

export default adminRouter