'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear el ENUM primero
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_product_status') THEN
              CREATE TYPE enum_product_status AS ENUM ('active','inactive','discontinued');
          END IF;
      END$$;
    `);

    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sale_type: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      cost_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sale_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bulk_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      priority: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      stock: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      min_stock: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      max_stock: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      last_checked_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      profit_percent: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      taxes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      barcode: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      status: {
        type: 'enum_product_status',
        allowNull: false,
        defaultValue: 'active',
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product');
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS enum_product_status;`);
  },
};
