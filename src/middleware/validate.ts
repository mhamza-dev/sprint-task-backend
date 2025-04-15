import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export const authValidation =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.errors || "Validation failed" });
    }
  };
