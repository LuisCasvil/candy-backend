import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface SaleTypeAttributes {
  id: number;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface SaleTypeAttributesCreationAttributes
  extends Optional<SaleTypeAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt"> {}

class SaleType
  extends Model<SaleTypeAttributes, SaleTypeAttributesCreationAttributes>
  implements SaleTypeAttributes
{
  id!: number;
  name?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;

  /** Método estático para inicializar el modelo desde un loader dinámico */
  static initModel(sequelize: Sequelize) {
    SaleType.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: true,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "sale_type",
        timestamps: true,
        paranoid: true,
        underscored: true,
        indexes: [
          {
            unique: true,
            fields: ["name"],
          },
        ],
      },
    );

    return SaleType;
  }

  /** Método opcional para asociar relaciones */
  static associate(models: any) {
    // Por ejemplo:
    // Product.belongsTo(models.Department, { foreignKey: 'departmentId' });
    // Product.belongsTo(models.Provider, { foreignKey: 'providerId' });
  }
}

export default SaleType;
