// Packages
import * as yup from "yup";

// ------------------ Login Schema ------------------
export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

// ------------------ Register Schema ------------------
export const registerSchema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().min(3).required(),
  password: yup.string().min(6).required(),
});
