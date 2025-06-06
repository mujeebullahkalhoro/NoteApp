import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const authenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Access Token is not found in cookies" });
    }

    try {
        const decodedAccessToken = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET);
        req.user = decodedAccessToken; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Access Token invalid or expired" });
    }
};

export {authenticateUser}
