import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import SaleTicket from "./saleTicket";

interface SaleTicketItemAttributes {
  id?: number;
  ticketId: number;
  productCode: string;
  productName: string;
  quantity: number;
  profit?: number;
  departmentId?: number;
  paidIn?: string;
  usesWholesale: boolean;
  discountPercent?: number;
  components?: string;
  taxesUsed?: string;
  taxUnit?: number;
  priceUsed: number;
  quantityReturned?: number;
  wasReturned: boolean;
  paidPercent?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface SaleTicketItemCreationAttributes
  extends Optional<
    SaleTicketItemAttributes,
    | "id"
    | "profit"
    | "departmentId"
    | "paidIn"
    | "discountPercent"
    | "components"
    | "taxesUsed"
    | "taxUnit"
    | "quantityReturned"
    | "paidPercent"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

class SaleTicketItem
  extends Model<SaleTicketItemAttributes, SaleTicketItemCreationAttributes>
  implements SaleTicketItemAttributes
{
  public id?: number;
  public ticketId!: number;
  public productCode!: string;
  public productName!: string;
  public quantity!: number;
  public profit?: number;
  public departmentId?: number;
  public paidIn?: string;
  public usesWholesale!: boolean;
  public discountPercent?: number;
  public components?: string;
  public taxesUsed?: string;
  public taxUnit?: number;
  public priceUsed!: number;
  public quantityReturned?: number;
  public wasReturned!: boolean;
  public paidPercent?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;
}

SaleTicketItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sale_ticket",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    productCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paidIn: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    usesWholesale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    discountPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    components: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    taxesUsed: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    taxUnit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    priceUsed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantityReturned: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    wasReturned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paidPercent: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "sale_ticket_item",
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

// 🔗 Asociación
SaleTicket.hasMany(SaleTicketItem, {
  foreignKey: "ticketId",
  as: "items",
});
SaleTicketItem.belongsTo(SaleTicket, {
  foreignKey: "ticketId",
  as: "ticket",
});

export default SaleTicketItem;
