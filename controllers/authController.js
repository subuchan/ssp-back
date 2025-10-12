
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login for admin only
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

// // Login for admin1 only
// const loginAdmin1 = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     if (username !== 'admin1') {
//       return res.status(403).json({ message: 'Access denied for this login' });
//     }

//     const admin1 = await Admin.findOne({ username: 'admin1' });
//     if (!admin1) return res.status(404).json({ message: "Admin1 not found" });

//     const isMatch = await bcrypt.compare(password, admin1.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign({ id: admin1._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };

module.exports = { loginAdmin };
