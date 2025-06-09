import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUser, 
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);
router.get('/me', authenticateUser, getUser);

export default router;
