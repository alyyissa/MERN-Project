import express from "express";
import { protect } from "../middleware/auth.js";
import { changeRoleToOwner } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/changerole', protect, changeRoleToOwner)

export default adminRouter