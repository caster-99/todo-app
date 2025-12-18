const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Define Associations
User.associate = (models) => {
    User.hasMany(models.Note, { foreignKey: 'UserId' }); // One-to-many
};

module.exports = User;
