// // routes/authRoutes.js
// const express = require('express');
// const { loginAdmin, } = require('../controllers/authController');

// const router = express.Router();

// router.post('/login-admin', loginAdmin);
// router.post('/login-admin1', loginAdmin1);

// module.exports = router;


const express = require('express');
const { loginAdmin,  } = require('../controllers/authController');

const router = express.Router();

// Regular admin
router.post('/login', loginAdmin);

// // Admin1
// router.post('/login-admin1', loginAdmin1);

module.exports = router;
