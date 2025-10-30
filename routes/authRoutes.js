const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/authController");

router.post("/admin/login", loginAdmin);
// router.post('/admin/login', loginAdmin);
// router.post("/register", registerUser);
// router.post('/login', loginUser);

module.exports = router;
