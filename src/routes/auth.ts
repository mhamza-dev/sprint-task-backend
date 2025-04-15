// Packages
import { Router } from "express";

// Schemas
import { loginSchema, registerSchema } from "../schemas/auth";

// Middleware
import { authValidation } from "../middleware";

// Services
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "../services/auth";

const router = Router();

router.post("/login", authValidation(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("login", email, password);
    const user = await loginUser(email, password);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

router.post("/register", authValidation(registerSchema), async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await registerUser({ email, username, password });
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otpCode } = req.body;
  const isVerified = await verifyOtp(email, otpCode);
  if (isVerified) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false, error: "OTP expired or invalid" });
  }
});

router.get("/logout", async (req, res) => {
  const accessToken = req.body.accessToken;
  await logoutUser(accessToken);
  res.status(200).json({ success: true, data: "Logged out" });
});

export default router;
