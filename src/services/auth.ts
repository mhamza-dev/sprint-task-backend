// Packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TokenType, User } from "@prisma/client";

// Services
import {
  createUser,
  createUserToken,
  deleteUserToken,
  getUserByEmail,
  getUserTokenByType,
} from "./users";
import { sendEmail } from "./email";

// UtilsCreateUserData,
import { CreatedUserData, CreateUserData, EmailType } from "../utils/types";

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    await validatePassword(password, user.password);
    const accessToken = await createAccessToken(user);
    const otpCode = await createOtpToken(user);
    await sendEmail({
      to: user.email,
      emailType: EmailType.OTP_VERIFICATION,
      props: {
        otpCode,
      },
    });

    return accessToken;
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error.message);
  }
};

export const registerUser = async ({
  email,
  password,
  username,
}: CreateUserData): Promise<string> => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await encryptPassword(password);

    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });

    console.log("user", user);
    const otpCode = await createOtpToken(user);

    sendEmail({
      to: user.email,
      emailType: EmailType.WELCOME_USER,
      props: {
        username: user.username,
      },
    });
    sendEmail({
      to: user.email,
      emailType: EmailType.OTP_VERIFICATION,
      props: {
        otpCode,
      },
    });
    const accessToken = await createAccessToken(user);
    return accessToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const verifyOtp = async (
  email: string,
  otpCode: string
): Promise<boolean> => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const otpToken = await getUserTokenByType({
      userId: user.id,
      type: TokenType.OTP,
      token: otpCode,
    });
    if (!otpToken) {
      throw new Error("OTP token not found");
    }

    console.log("otpToken", otpToken);
    console.log("otpCode", otpCode);

    if (otpToken.token !== otpCode || otpToken.expires < new Date()) {
      return false;
    }
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async (accessToken: string): Promise<void> => {
  try {
    await deleteUserToken(accessToken);
  } catch (error) {
    throw new Error("Failed to logout user");
  }
};

export const createOtpToken = async (user: User): Promise<string> => {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await createUserToken({
      token: otpCode,
      userId: user.id,
      type: TokenType.OTP,
      expires: new Date(Date.now() + 10 * 60 * 1000),
    });

    return otpCode;
  } catch (error) {
    throw new Error("Failed to create OTP token");
  }
};

const createAccessToken = async (user: User): Promise<string> => {
  try {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    await createUserToken({
      token: accessToken,
      userId: user.id,
      type: TokenType.ACCESS,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return accessToken;
  } catch (error) {
    throw new Error("Failed to create access token");
  }
};

const encryptPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Failed to encrypt password");
  }
};

const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    return isValid;
  } catch (error) {
    throw new Error("Failed to validate password");
  }
};
