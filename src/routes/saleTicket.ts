import { Router } from "express";
import { getSalesTotalByDate } from "../controllers/saleTicket.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

// ✅ Listar todos los productos
router.get("/", asyncHandler(getSalesTotalByDate));

export default router;
