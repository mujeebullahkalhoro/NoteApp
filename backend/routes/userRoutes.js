import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUser,
  forgotPassword,resetPassword
} from "../controllers/userController.js";

import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
router.get('/me', authenticateUser, getUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
