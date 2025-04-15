// Packages
import { Category, UserCategory } from "@prisma/client";

// Utils
import prisma from "../utils/db";
import { CreateCategoryData, UpdateCategoryData } from "../utils/types";

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};

// Get categories for a specific user
export const getUserCategories = async (
  userId: string
): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      where: { userCategories: { some: { userId } } },
    });
    return categories;
  } catch (error) {
    console.error(`Error fetching categories for user ${userId}:`, error);
    throw error;
  }
};

// Get a single category
export const getCategory = async (categoryId: string): Promise<Category> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`);
    }
    return category;
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error);
    throw error;
  }
};

// Create a new category and associate it with a user
export const createCategory = async (
  data: CreateCategoryData
): Promise<UserCategory> => {
  try {
    const { userId, ...categoryData } = data;

    const category = await prisma.category.create({
      data: categoryData,
    });

    const userCategory = await prisma.userCategory.create({
      data: {
        userId: userId,
        categoryId: category.id,
      },
    });

    return userCategory;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update a category
export const updateCategory = async (
  categoryId: string,
  data: UpdateCategoryData
): Promise<Category> => {
  try {
    const category = await prisma.category.update({
      where: { id: categoryId },
      data,
    });
    return category;
  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId: string): Promise<Category> => {
  try {
    // First delete all associated tasks
    await prisma.task.deleteMany({
      where: { categoryId },
    });

    // Then delete all userCategory associations
    await prisma.userCategory.deleteMany({
      where: { categoryId },
    });

    // Finally delete the category
    const category = await prisma.category.delete({
      where: { id: categoryId },
    });

    return category;
  } catch (error) {
    console.error(`Error deleting category ${categoryId}:`, error);
    throw error;
  }
};
