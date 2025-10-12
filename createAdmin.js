const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const createDefaultAdmins = async () => {
  try {
    // ===== Create admin =====
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({ email: 'admin@gmail.com', password: hashedPassword });
      console.log('✅ Default admin created: admin@gmail.com / admin123');
    } else {
      console.log('🚨 Admin already exists');
    }

    // ===== Create admin1 =====
    // const existingAdmin1 = await Admin.findOne({ username: 'admin1' });
    // if (!existingAdmin1) {
    //   const hashedPassword = await bcrypt.hash('admin123', 10);
    //   await Admin.create({ username: 'admin1', password: hashedPassword });
    //   console.log('✅ Default admin1 created: admin1 / admin123');
    // } else {
    //   console.log('🚨 Admin1 already exists');
    // }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admins:', err.message);
    process.exit(1);
  }
};

createDefaultAdmins();
