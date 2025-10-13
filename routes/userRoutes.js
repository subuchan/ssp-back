const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');

// Get user by ID
router.get('/:id', getUserById);

module.exports = router;
