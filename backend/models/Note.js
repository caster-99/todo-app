const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Note = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

// Define Associations
Note.associate = (models) => {
    Note.belongsTo(models.User, { foreignKey: 'UserId' });       // Many-to-one
    Note.belongsTo(models.Category, { foreignKey: 'CategoryId' }); // Many-to-one
};

module.exports = Note;
