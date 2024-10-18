import express from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { loginUser, signupUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/admin/login", loginAdmin);
router.post('/user/signup', signupUser);
router.post('/user/login', loginUser);

export default router;

