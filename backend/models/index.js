const sequelize = require('../config/config.js'); // Sequelize instance
const User = require('./User.js');
const Note = require('./Note.js');
const Category = require('./Category.js');

// Call associations
User.associate({ Note });
Note.associate({ User, Category });
Category.associate({ Note });

// Export models and sequelize instance
module.exports = {
    sequelize,
    User,
    Note,
    Category,
};
