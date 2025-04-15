// ------------------ Imports ------------------
import { TaskStatus, TokenType } from "@prisma/client";

// ------------------ DB Types & Interfaces ------------------
export type CreateUserData = {
  email: string;
  password: string;
  username: string;
};

export type CreatedUserData = {
  email: string;
  username: string;
  id: string;
};

export type CreateUserTokenData = {
  token: string;
  userId: string;
  type: TokenType;
  expires: Date;
};

export type CreateTaskData = {
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string;
  flagId: string;
  userId: string;
};

export type UpdateTaskData = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  categoryId?: string;
  flagId?: string;
};

export type CreateCategoryData = {
  name: string;
  backgroundColor: string;
  icon: string;
  isDefault?: boolean;
  userId: string; // For creating the UserCategory association
};

export type UpdateCategoryData = {
  name?: string;
  backgroundColor?: string;
  icon?: string;
  isDefault?: boolean;
};

export type CreateFlagData = {
  name: string;
  backgroundColor: string;
  icon: string;
  userId: string; // For creating the UserFlag association
};

export type UpdateFlagData = {
  name?: string;
  backgroundColor?: string;
  icon?: string;
};

// ------------------ Email Types & Interfaces ------------------
export enum EmailType {
  OTP_VERIFICATION = "otpVerification",
  PASSWORD_RESET = "passwordReset",
  WELCOME_USER = "welcomeUser",
  TASK_ASSIGNMENT = "taskAssignment",
}

export interface EmailTemplate {
  subject: string;
  html: string;
}

export interface BaseEmailTemplateProps<T = EmailProps> {
  emailType: EmailType;
  props: T;
}

export type EmailProps =
  | TaskAssignmentProps
  | PasswordResetProps
  | OtpVerificationProps
  | WelcomeUserProps;

export interface TaskAssignmentProps {
  taskName: string;
  assignedBy: string;
}

export interface WelcomeUserProps {
  username: string;
}

export interface PasswordResetProps {
  resetLink: string;
}

export interface OtpVerificationProps {
  otpCode: string;
}
