import { Request } from "express";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { sequelize } from "../config/database";
import SaleTicket from "../models/saleTicket";

export const getSalesTotalByDate = controllerWrapper(async (req: Request) => {
  const { date } = req.query;

  if (!date) {
    throw ApiError.badRequest("Missing 'date' query parameter (YYYY-MM-DD)");
  }

  const query = `
    SELECT 
    DATE(created_at) AS sale_date,
    COALESCE(SUM(total_amount), 0) AS total_sales
    FROM sale_ticket
    WHERE DATE(created_at) = :date
    GROUP BY sale_date;
  `;

  try {
    const [rows]: any = await sequelize.query(query, {
      replacements: { date },
      type: "SELECT",
      raw: true,
    });

    if (!rows) {
      throw ApiError.notFound("No sales found for the selected date");
    }

    return ApiResponse.withStatus("Sales total retrieved", rows, 200);
  } catch (error: any) {
    console.error("❌ Error ejecutando consulta:", error);
    throw ApiError.internal("Error querying sales total");
  }
});

/**
 * (Tu función existente)
 */
export const getAllProducts = controllerWrapper(async (_req: Request) => {
  const tickets = await SaleTicket.findAll();
  if (!tickets || tickets.length === 0) {
    throw ApiError.notFound("No tickets found");
  }
  return ApiResponse.withStatus("Tickets retrieved", tickets, 200);
});
