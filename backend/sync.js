// sync.js

const { sequelize } = require('./config/config');
const { Note } = require('./models/Note');
const { Category } = require('./models/Category');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // This will drop and recreate tables
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
};

syncDatabase();
