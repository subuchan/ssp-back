// // // createAdmin.js
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
// // const bcrypt = require('bcryptjs');
// // const Admin = require('./models/Admin');
// // const connectDB = require('./config/db');

// // dotenv.config();
// // connectDB();

// // const createDefaultAdmin = async () => {
// //   try {
// //     const existing = await Admin.findOne({ username: 'admin' });
// //     if (existing) {
// //       console.log('🚨 Admin already exists.');
// //       process.exit(0);
// //     }

// //     const hashedPassword = await bcrypt.hash('admin123', 10);

// //     const newAdmin = new Admin({
// //       username: 'admin',
// //       password: hashedPassword
// //     });

// //     await newAdmin.save();
// //     console.log('✅ Default admin created:');
// //     console.log('   Username: admin');
// //     console.log('   Password: admin123');
// //     process.exit(0);
// //   } catch (err) {
// //     console.error('❌ Error creating admin:', err.message);
// //     process.exit(1);
// //   }
// // };

// createDefaultAdmin();
// createAdmins.js
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
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({ username: 'admin', password: hashedPassword });
      console.log('✅ Default admin created: admin / admin123');
    } else {
      console.log('🚨 Admin already exists');
    }

    // ===== Create admin1 =====
    const existingAdmin1 = await Admin.findOne({ username: 'admin1' });
    if (!existingAdmin1) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({ username: 'admin1', password: hashedPassword });
      console.log('✅ Default admin1 created: admin1 / admin123');
    } else {
      console.log('🚨 Admin1 already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admins:', err.message);
    process.exit(1);
  }
};

createDefaultAdmins();
