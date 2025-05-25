// migrations/20250523-create-request.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requests', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      status: { type: Sequelize.ENUM('pending', 'in_progress', 'done', 'rejected', 'canceled'), defaultValue: 'pending' },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      city: { type: Sequelize.STRING },
      date: { type: Sequelize.DATE },
      files: { type: Sequelize.TEXT },
      price: { type: Sequelize.STRING },
      allowAgentPrice: { type: Sequelize.BOOLEAN, defaultValue: false },
      location: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Requests');
  }
};
