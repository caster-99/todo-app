// migrations/20250107160244-add-userId-to-notes.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the column if it exists
    await queryInterface.removeColumn('Notes', 'UserId');

    // Add the column again (if necessary)
    await queryInterface.addColumn('Notes', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Assuming 'Users' is your users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Notes', 'UserId');
  },
};
