import express from "express";
import {signUp} from "../controllers/auth.controller.js";
import { login } from "../controllers/login.controller.js";
import { forgotPassword } from "../controllers/forgotPassword.controller.js";
import { verifyOtp } from "../controllers/verifyOtp.controller.js";
import { resetPassword } from "../controllers/resetPassword.controller.js";
import { profileImage } from "../controllers/userProfile.controller.js";
import upload from "../middleware/multer.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.patch("/profile-image", authMiddleware, upload.single("profileImage"), profileImage);

export default router;