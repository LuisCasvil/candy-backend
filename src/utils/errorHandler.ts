// src/utils/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // Si ya es ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details ?? null,
    });
  }

  // Sequelize validation errors
  if (err && err.name === "SequelizeValidationError") {
    const details = (err.errors || []).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details,
    });
  }

  // Sequelize unique constraint (and others)
  if (err && err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Unique constraint error",
      details: err.errors?.map((e: any) => e.message) ?? null,
    });
  }

  // Otros errores inesperados
  console.error("❌ Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
