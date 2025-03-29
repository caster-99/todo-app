const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index.js'); // Load models
const notesRoutes = require('./routes/notesRoutes.js');
const categoriesRoutes = require('./routes/categoriesRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(bodyParser.json());

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Error connecting to the database:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Notes and Categories API');
});

app.use('/api/notes', notesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
