// Packages
import { TokenType, User, UserToken } from "@prisma/client";

// Utils
import prisma from "../utils/db";
import { CreateUserData, CreateUserTokenData } from "../utils/types";

export const getUser = async (id: string): Promise<User> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  try {
    console.log("createUser", data);
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    throw new Error("User not created");
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Users not found");
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    throw new Error("User not updated");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  } catch (error) {
    throw new Error("User not deleted");
  }
};

export const createUserToken = async (
  data: CreateUserTokenData
): Promise<UserToken> => {
  try {
    const userToken = await prisma.userToken.create({
      data,
    });
    return userToken;
  } catch (error) {
    throw new Error("User token not created");
  }
};

export const deleteUserToken = async (token: string): Promise<void> => {
  try {
    await prisma.userToken.delete({ where: { token } });
  } catch (error) {
    throw new Error("User token not deleted");
  }
};

export const getUserTokenByType = async (
  userId: string,
  type: TokenType
): Promise<UserToken | null> => {
  try {
    const userToken = await prisma.userToken.findFirst({
      where: { userId, type },
    });
    return userToken;
  } catch (error) {
    throw new Error("User token not found");
  }
};
