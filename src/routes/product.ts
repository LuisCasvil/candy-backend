import { Router } from "express";
import { getAllProducts, createProduct } from "../controllers/product.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// ✅ Listar todos los productos
router.get("/", asyncHandler(getAllProducts));

// ✅ Crear un nuevo producto
router.post("/", asyncHandler(createProduct));

export default router;
