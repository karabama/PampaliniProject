// migration: add unique constraint to nationalCode in Users table
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure type is correct and add unique constraint if not exists
    await queryInterface.changeColumn('Users', 'nationalCode', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addConstraint('Users', {
      fields: ['nationalCode'],
      type: 'unique',
      name: 'users_nationalcode_unique',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove unique constraint
    await queryInterface.removeConstraint('Users', 'users_nationalcode_unique');
    // Optionally revert type (if needed)
    await queryInterface.changeColumn('Users', 'nationalCode', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};