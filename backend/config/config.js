// config/config.js
const { Sequelize } = require('sequelize');
require('dotenv/config'); // Ensure environment variables are loaded

// Create a new Sequelize instance with the required configuration
const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,  // Use environment variables for flexibility
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true, // Optional: Disable SQL query logging

});

module.exports = sequelize;
