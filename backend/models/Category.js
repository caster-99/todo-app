const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
});

// Define Associations
Category.associate = (models) => {
    Category.hasMany(models.Note, { foreignKey: 'CategoryId' }); // One-to-many
};

module.exports = Category;
