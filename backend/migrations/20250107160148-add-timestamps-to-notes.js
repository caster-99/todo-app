// migrations/xxxxxx-add-timestamps-to-notes.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Notes', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    });
    await queryInterface.addColumn('Notes', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
      onUpdate: Sequelize.fn('now'),
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Notes', 'createdAt');
    await queryInterface.removeColumn('Notes', 'updatedAt');
  }
};
