// Packages
import { Flag, UserFlag } from "@prisma/client";

// Utils
import prisma from "../utils/db";
import { CreateFlagData, UpdateFlagData } from "../utils/types";

// Get all flags
export const getAllFlags = async (): Promise<Flag[]> => {
  try {
    const flags = await prisma.flag.findMany();
    return flags;
  } catch (error) {
    console.error("Error fetching all flags:", error);
    throw error;
  }
};

// Get flags for a specific user
export const getUserFlags = async (userId: string): Promise<Flag[]> => {
  try {
    const flags = await prisma.flag.findMany({
      where: { userFlags: { some: { userId } } },
    });
    return flags;
  } catch (error) {
    console.error(`Error fetching flags for user ${userId}:`, error);
    throw error;
  }
};

// Get a single flag
export const getFlag = async (flagId: string): Promise<Flag> => {
  try {
    const flag = await prisma.flag.findUnique({
      where: { id: flagId },
    });
    if (!flag) {
      throw new Error(`Flag with id ${flagId} not found`);
    }
    return flag;
  } catch (error) {
    console.error(`Error fetching flag ${flagId}:`, error);
    throw error;
  }
};

// Create a new flag and associate it with a user
export const createFlag = async (data: CreateFlagData): Promise<UserFlag> => {
  try {
    const { userId, ...flagData } = data;

    const flag = await prisma.flag.create({
      data: flagData,
    });

    const userFlag = await prisma.userFlag.create({
      data: {
        userId: userId,
        flagId: flag.id,
      },
    });

    return userFlag;
  } catch (error) {
    console.error("Error creating flag:", error);
    throw error;
  }
};

// Update a flag
export const updateFlag = async (
  flagId: string,
  data: UpdateFlagData
): Promise<Flag> => {
  try {
    const flag = await prisma.flag.update({
      where: { id: flagId },
      data,
    });
    return flag;
  } catch (error) {
    console.error(`Error updating flag ${flagId}:`, error);
    throw error;
  }
};

// Delete a flag
export const deleteFlag = async (flagId: string): Promise<Flag> => {
  try {
    // First delete all userFlag associations
    await prisma.userFlag.deleteMany({
      where: { flagId },
    });

    // Then delete the flag
    const flag = await prisma.flag.delete({
      where: { id: flagId },
    });

    return flag;
  } catch (error) {
    console.error(`Error deleting flag ${flagId}:`, error);
    throw error;
  }
};
