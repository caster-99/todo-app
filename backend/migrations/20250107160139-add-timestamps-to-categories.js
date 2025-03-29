// migrations/xxxxxx-add-timestamps-to-categories.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categories', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('categories', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categories', 'createdAt');
    await queryInterface.removeColumn('categories', 'updatedAt');
  }
};
