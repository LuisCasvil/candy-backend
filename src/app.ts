import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import models, { sequelize } from "./models";
import { errorHandler } from "./utils/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
(async () => {
  await sequelize.sync({ alter: true });
  console.log("✅ All models synced");
  console.log(Object.keys(models));
})();
// Rutas
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Servidor Express con TypeScript funcionando 🚀");
});

app.use(errorHandler);

export default app;
