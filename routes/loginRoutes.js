import express from "express";
import register from "../schemas/RegisterSchema.js";
import jwt from "jsonwebtoken";
import verifyToken from "../MiddleWare/verifyToken.js";
const route = express.Router();

route.post("/", async (req, resp) => {
    try {
      const { email, password } = req.body;
      
      // Check both
      if (!email || !password) {
        return resp.send({ message: "Please enter both email and password" });
      }
      
      // Check user
      let user = await register.findOne({ email }); 
      if (!user) {
        return resp.send({ message: "User not found, please register yourself" });
      }
      // Assign a token
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            return resp.send({ message: "Error in token generation" });
          } else {
            return resp.send({
              message: "User logged in successfully",
              user: {...user.toObject(),password:undefined},
              token: token,
            });
          }
        }
      );
    } catch (error) {
      console.log("Server error", error);
      resp.send({ message: "Server error", error: error.message });
    }
  });
  
export default route;
