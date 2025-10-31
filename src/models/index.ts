import fs from "fs";
import path from "path";
import { sequelize } from "../config/database";
import { ModelCtor, Model } from "sequelize";

const basename = path.basename(__filename);
const models: { [key: string]: ModelCtor<Model> } = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
    );
  })
  .forEach((file) => {
    const imported = require(path.join(__dirname, file));
    const model = imported.default || imported; // soporte para default export y module.exports
    if (!model || !model.name) {
      console.warn(`⚠️ Modelo no cargado desde: ${file}`);
      return;
    }
    models[model.name] = model;
  });

// Aplicar asociaciones si existen
Object.values(models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;
