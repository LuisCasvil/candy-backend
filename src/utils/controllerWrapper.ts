// src/utils/controllerWrapper.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError";
import { ApiResponse } from "./apiResponse";

type HandlerFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * controllerWrapper:
 * - Recibe un handler asincrónico
 * - Si el handler devuelve:
 *    - ApiResponse => respeta statusCode si existe, o 200 por defecto
 *    - { statusCode, message, data } => respeta statusCode
 *    - cualquier objeto simple => responde 200 con ApiResponse('OK', obj)
 *    - undefined => responde 204
 * - Si lanza ApiError se usa su statusCode
 * - Si lanza otro error --> 500
 */
export const controllerWrapper = (handler: HandlerFn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);

      // Si el handler devolvió un ApiResponse
      if (result instanceof ApiResponse) {
        const status = result.statusCode ?? 200;
        return res.status(status).json(result.toJSON());
      }

      // Si devolvió un objeto que contiene statusCode/message/data (convenio)
      if (result && typeof result === "object" && "statusCode" in result && "message" in result) {
        const status = (result as any).statusCode || 200;
        return res.status(status).json({
          success: true,
          message: (result as any).message,
          data: (result as any).data ?? null,
        });
      }

      // Objeto o array cualquiera -> 200
      if (result !== undefined) {
        return res.status(200).json(new ApiResponse("OK", result).toJSON());
      }

      // Nada devuelto -> 204 No Content
      return res.status(204).end();
    } catch (err: any) {
      // Manejo de ApiError lanzado intencionalmente
      if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
          success: false,
          message: err.message,
          details: err.details ?? null,
        });
      }

      // Si el handler llamó a next(err) con objeto de express
      if (err && err.status && err.message) {
        return res.status(err.status).json({
          success: false,
          message: err.message,
          details: err.details ?? null,
        });
      }

      // Errores no esperados --> delegar al middleware de errores global
      return next(err);
    }
  };
};
