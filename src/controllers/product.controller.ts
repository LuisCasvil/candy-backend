import { Request } from "express";
import { controllerWrapper } from "../utils/controllerWrapper";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import SaleType from "../models/saleType";
import Product from "../models/product";

export const getAllProducts = controllerWrapper(async (_req: Request) => {
  const products = await Product.findAll();
  console.log("productoooos", products);
  if (!products || products.length === 0) {
    throw ApiError.notFound("No products found");
  }
  return ApiResponse.withStatus("Products retrieved", products, 200);
});

export const createProduct = controllerWrapper(async (req: Request) => {
  const {
    barcode,
    code,
    description,
    saleTypeId,
    salePrice,
    costPrice,
    bulkPrice,
    departmentId,
    unitId,
    stock,
    providerId,
    profitPercent,
  } = req.body;

  const saleTypeExist = await SaleType.findByPk(saleTypeId);
  if (!saleTypeExist) throw ApiError.notFound("Sale Type is invalid.", saleTypeId);
  // ejemplo de validación simple
  if (!description || !saleTypeId) {
    throw ApiError.badRequest("description and saleType are required");
  }

  const product = await Product.create({
    barcode,
    code,
    description,
    saleTypeId,
    salePrice,
    costPrice,
    bulkPrice,
    departmentId,
    unitId,
    stock,
    providerId,
    profitPercent,
    status: "active",
  });
  return ApiResponse.withStatus("Product created", product, 201);
});
