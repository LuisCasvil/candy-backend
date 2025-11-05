import { Router } from "express";
import productRoutes from "./product";
import saleTicketRoutes from "./saleTicket";

const router = Router();

router.use("/products", productRoutes);
router.use("/saleTicket", saleTicketRoutes);

export default router;
