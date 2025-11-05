'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sale_ticket_item', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sale_ticket',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      product_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      profit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      paid_in: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      uses_wholesale: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discount_percent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      components: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      taxes_used: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tax_unit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      price_used: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      quantity_returned: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      was_returned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      paid_percent: {
        type: Sequelize.SMALLINT,
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
    await queryInterface.dropTable('sale_ticket_item');
  },
};
