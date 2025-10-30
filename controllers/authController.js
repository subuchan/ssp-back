const Admin = require('../models/Admin');
const User = require("../models/User");

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* -------------------------------
   🔐 Admin Login
--------------------------------*/
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email !== 'admin@gmail.com') {
      return res.status(403).json({ message: 'Access denied for this login' });
    }

    const admin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// /* -------------------------------
//    👤 Register New User
// --------------------------------*/
// const registerUser = async (req, res) => {
//   try {
//     const { user_name, email, password, mobile_number } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ status_code: 400, message: "Email already registered." });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate unique userId
//     const userId = "USR" + Math.floor(100000 + Math.random() * 900000);

//     // Save to DB
//     const newUser = await User.create({
//       user_name,
//       email,
//       password: hashedPassword,
//       mobile_number,
//       userId
//     });

//     // Send email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: `"S.S.Promoters" <${process.env.SMTP_EMAIL}>`,
//       to: email,
//       subject: "Welcome! Your Login Details",
//       html: `
//         <h2>Welcome ${user_name} 🎉</h2>
//         <p>Thank you for registering with us!</p>
//         <p><strong>User ID:</strong> ${userId}</p>
//         <p><strong>Password:</strong> ${password}</p>
//         <p>Please keep these details safe.</p>
//       `,
//     };

//     try {
//      await transporter.sendMail(mailOptions);
//      console.log("Email sent successfully to", email);
//     } catch (emailErr) {
//     console.error("Email sending failed:", emailErr.message);
//     // Optional: include a warning in the response
//     // res.status(200).json({ message: "User created but email failed", data: { userId } });
//     }

//     res.status(200).json({
//       status_code: 200,
//       message: "User registered successfully! Credentials sent via email.",
//       data: { userId },
//     });

//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({
//       status_code: 500,
//       message: "Server error during registration",
//       error: err.message
//     });
//   }
// };


// // User login
// const loginUser = async (req, res) => {
//   const { login_input, password } = req.body;

//   try {
//     // Find user by userId or email
//     const user = await User.findOne({ 
//       $or: [
//         { userId: login_input },
//         { email: login_input }
//       ]
//     });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.json({
//       message: "Login successful",
//       data: {
//         user_id: user._id,
//         login_input: login_input,
//         token,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };
/* -------------------------------
   📦 Export Controllers
--------------------------------*/
module.exports = { loginAdmin };
