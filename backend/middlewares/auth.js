import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const authenticateUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Access Token is not found in cookies" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: "Access Token invalid or expired" });
  }
};

export { authenticateUser };
