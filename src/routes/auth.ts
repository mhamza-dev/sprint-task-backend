// Packages
import { Router } from "express";

// Schemas
import { loginSchema, registerSchema } from "../schemas/auth";

// Middleware
import { authValidation } from "../middleware";

// Services
import {
  createOtpToken,
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "../services/auth";
import { getUserByEmail } from "../services/users";
import { User } from "@prisma/client";
import { sendEmail } from "../services/email";
import { EmailType } from "../utils/types";

const router = Router();

router.post("/login", authValidation(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const accessToken = await loginUser(email, password);
    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: accessToken,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
});

router.post("/register", authValidation(registerSchema), async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await registerUser({ email, username, password });
    if (!user) {
      res.status(401).json({ success: false, error: "User not created" });
      return;
    }
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otpCode } = req.body;
  try {
    const isVerified = await verifyOtp(email, otpCode);
    if (isVerified) {
      res.status(200).json({ success: true, data: "OTP verified" });
    } else {
      res.status(200).json({ success: false, error: "OTP expired or invalid" });
    }
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ success: false, error: "Email is required" });
      return;
    }
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    const fetchedUser = user as User;
    const otpToken = await createOtpToken(fetchedUser);

    await sendEmail({
      to: fetchedUser.email,
      emailType: EmailType.OTP_VERIFICATION,
      props: {
        otpCode: otpToken,
      },
    });
    res.status(200).json({ success: true, data: otpToken });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

router.get("/logout", async (req, res) => {
  const accessToken = req.body.accessToken;
  try {
    await logoutUser(accessToken);
    res.status(200).json({ success: true, data: "Logged out" });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

export default router;
