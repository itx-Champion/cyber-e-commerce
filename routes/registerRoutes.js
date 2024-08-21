import express from "express";
import register from "../schemas/RegisterSchema.js";
import jwt from "jsonwebtoken";
import sendEmail from "../MiddleWare/SendEmail.js";
const router = express.Router();

router.post("/", async (req, resp) => {
  try {
    const { email, password } = req.body;
    // check user already exits
    let user = await register.findOne({ email, password });
    if (user) {
      resp.send({ message: "User already exits, email is in use already:" });
    }

    const newUser = new register(req.body);
    await newUser.save();
    user = newUser.toObject();
    delete user.password;

    // sending email
    await sendEmail(
      user.email,
      "Welcome to Our Website",
      `Hello ${user.name},\n\nThank you for registering with us!`
    );
    // assign a yoken
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          resp.send({ message: "error in token generation" });
        } else {
          resp.send({
            message: "user registered successfully",
            user: user,
            token: token,
          });
        }
      }
    );
  } catch (error) {
    resp.send({ message: "server error", error });
  }
});
export default router;
