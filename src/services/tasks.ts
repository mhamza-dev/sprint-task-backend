// Packages
import { Task, UserTask } from "@prisma/client";

// Utils
import prisma from "../utils/db";
import { CreateTaskData, UpdateTaskData } from "../utils/types";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
};

export const getUserTasks = async (userId: string): Promise<Task[]> => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userTasks: { some: { userId } } },
    });
    return tasks;
  } catch (error) {
    console.error(`Error fetching tasks for user ${userId}:`, error);
    throw error;
  }
};

export const getTask = async (taskId: string): Promise<Task> => {
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    return task;
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    throw error;
  }
};

export const createTask = async (data: CreateTaskData): Promise<UserTask> => {
  try {
    const task = await prisma.task.create({ data });
    const userTask = await prisma.userTask.create({
      data: {
        userId: data.userId,
        taskId: task.id,
      },
    });
    return userTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (
  taskId: string,
  data: UpdateTaskData
): Promise<Task> => {
  try {
    const task = await prisma.task.update({ where: { id: taskId }, data });
    return task;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<Task> => {
  try {
    const task = await prisma.task.delete({ where: { id: taskId } });
    return task;
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw error;
  }
};
