import express from "express";
import {
  login,
  logout,
  signup,
  verifyemail, 
  forgotPassword,
  resetPassword,
  checkAuth
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyemail);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
