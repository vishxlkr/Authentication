import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes that require authentication
export const protect = async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         token = req.headers.authorization.split(" ")[1];

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         req.user = await User.findById(decoded.id).select("-password");

         if (!req.user) {
            return res
               .status(401)
               .json({ message: "Not authorized, user not found" });
         }

         next();
      } catch (error) {
         console.error(error);
         return res
            .status(401)
            .json({ message: "Not authorized, token failed" });
      }
   }

   if (!token) {
      return res
         .status(401)
         .json({ message: "Not authorized, no token provided" });
   }
};
