const express = require('express');
const router = express.Router();
const { loginUser } = require("../controllers/userController")
// Add login route
router.post('/login', loginUser);

module.exports = router;
