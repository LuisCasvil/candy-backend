import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface SaleTicketAttributes {
  id?: number;
  ticketNumber: string;
  userId?: string;
  customerId?: number;
  totalAmount: number;
  paymentMethod?: string;
  paidAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface SaleTicketCreationAttributes
  extends Optional<
    SaleTicketAttributes,
    "id" | "customerId" | "paymentMethod" | "paidAt" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class SaleTicket
  extends Model<SaleTicketAttributes, SaleTicketCreationAttributes>
  implements SaleTicketAttributes
{
  public id?: number;
  public ticketNumber!: string;
  public customerId?: number;
  public userId?: string;
  public totalAmount!: number;
  public paymentMethod?: string;
  public paidAt?: Date | null;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;
}

SaleTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "sale_ticket",
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

export default SaleTicket;
