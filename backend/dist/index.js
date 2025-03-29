"use strict";

var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var _require = require('./models/index.js'),
  sequelize = _require.sequelize; // Load models
var notesRoutes = require('./routes/notesRoutes.js');
var categoriesRoutes = require('./routes/categoriesRoutes.js');
var userRoutes = require('./routes/userRoutes.js');
var cors = require('cors');
dotenv.config();
var app = express();
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Test DB connection
sequelize.authenticate().then(function () {
  return console.log('Database connected successfully!');
})["catch"](function (err) {
  return console.error('Error connecting to the database:', err);
});

// Routes
app.get('/', function (req, res) {
  res.send('Welcome to the Notes and Categories API');
});
app.use('/api/notes', notesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', userRoutes);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});
