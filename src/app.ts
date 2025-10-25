import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// Rutas
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Servidor Express con TypeScript funcionando 🚀");
});

export default app;
