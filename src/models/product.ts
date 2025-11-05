import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database"; // 👈 Ajusta el path según tu estructura

interface ProductAttributes {
  id?: number;
  barcode?: string;
  imageUrl?: string;
  code?: string;
  description: string;
  saleType: string;
  costPrice: number;
  salePrice: number;
  departmentId?: number;
  providerId?: number;
  unitId: number;
  bulkPrice?: number;
  priority?: number;
  stock: number;
  minStock?: number;
  maxStock?: number;
  lastCheckedAt?: Date | null;
  profitPercent?: number;
  taxes?: string | null;
  status: "active" | "inactive" | "discontinued";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    | "id"
    | "barcode"
    | "imageUrl"
    | "code"
    | "departmentId"
    | "providerId"
    | "bulkPrice"
    | "priority"
    | "minStock"
    | "maxStock"
    | "lastCheckedAt"
    | "profitPercent"
    | "taxes"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  saleType!: string;
  id?: number;
  barcode?: string;
  imageUrl?: string;
  code?: string;
  description!: string;
  costPrice!: number;
  salePrice!: number;
  departmentId?: number;
  providerId?: number;
  unitId!: number;
  bulkPrice?: number;
  priority?: number;
  stock!: number;
  minStock?: number;
  maxStock?: number;
  lastCheckedAt?: Date | null;
  profitPercent?: number;
  taxes?: string | null;
  status!: "active" | "inactive" | "discontinued";
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
}

// 🧱 Inicialización directa del modelo
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    saleType: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    costPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bulkPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    priority: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    stock: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    maxStock: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    lastCheckedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    profitPercent: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    taxes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    barcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Código de barras o EAN del producto",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "discontinued"),
      allowNull: false,
      defaultValue: "active",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "URL o ruta de la imagen principal del producto",
    },
  },
  {
    sequelize, // 👈 ya está importado arriba
    tableName: "product",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ["barcode"] },
      { unique: true, fields: ["code"] },
    ],
  },
);

export default Product;
