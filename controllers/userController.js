const  bcrypt = require("bcryptjs");
const nodemailer =require("nodemailer");
const User =require("../models/User.js");
const UserRequest = require("../models/UserRequest.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// 📩 Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/* -------------------------------
   👤 Step 1: Register New Request
--------------------------------*/
const registerUser = async (req, res) => {
  try {
    const { user_name, email, password, mobile_number } = req.body;

    // check duplicates
    const existingUser = await User.findOne({ email });
    const existingRequest = await UserRequest.findOne({ email });
    if (existingUser || existingRequest) {
      return res
        .status(400)
        .json({ message: "Email already registered or pending approval." });
    }

    await UserRequest.create({
      user_name,
      email,
      password,
      mobile_number,
      status: "pending",
    });

    res.status(200).json({
      message: "Registration request sent. Awaiting admin approval.",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};


// User login
const loginUser = async (req, res) => {
  const { login_input, password } = req.body;

  try {
    // Find user by userId or email
    const user = await User.findOne({ 
      $or: [
        { userId: login_input },
        { email: login_input }
      ]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      data: {
        user_id: user._id,
        login_input: login_input,
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
/* -------------------------------
   ✅ Step 2: Approve Request
--------------------------------*/
 const approveUser = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userReq = await UserRequest.findById(requestId);
    if (!userReq) return res.status(404).json({ message: "Request not found" });

    if (userReq.status !== "pending") {
      return res
        .status(400)
        .json({ message: `User already ${userReq.status}.` });
    }

    const userId = "USR" + Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(userReq.password, 10);

    const newUser = await User.create({
      user_name: userReq.user_name,
      email: userReq.email,
      password: hashedPassword,
      mobile_number: userReq.mobile_number,
      userId,
    });

    // send approval email
    const mailOptions = {
      from: `"S.S.Promoters" <${process.env.SMTP_EMAIL}>`,
      to: userReq.email,
      subject: "🎉 Account Approved - Your Login Credentials",
      html: `
        <h2>Hello ${userReq.user_name},</h2>
        <p>Your registration request has been approved.</p>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Password:</strong> ${userReq.password}</p>
        <p>You can now log in using these credentials.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // update request status or delete
    userReq.status = "approved";
    await userReq.save();

    res.status(200).json({ message: "User approved and credentials sent." });
  } catch (err) {
    console.error("Approval error:", err);
    res.status(500).json({ message: "Server error during approval" });
  }
};

/* -------------------------------
   ❌ Step 3: Reject Request
--------------------------------*/
 const rejectUser = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userReq = await UserRequest.findById(requestId);
    if (!userReq) return res.status(404).json({ message: "Request not found" });

    if (userReq.status !== "pending") {
      return res
        .status(400)
        .json({ message: `User already ${userReq.status}.` });
    }

    // optional: send rejection email
    const mailOptions = {
      from: `"S.S.Promoters" <${process.env.SMTP_EMAIL}>`,
      to: userReq.email,
      subject: "❌ Registration Request Rejected",
      html: `
        <h2>Hello ${userReq.user_name},</h2>
        <p>We regret to inform you that your registration request has been rejected.</p>
        <p>If you believe this is a mistake, please contact support.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    userReq.status = "rejected";
    await userReq.save();

    res.status(200).json({ message: "User request rejected and notified." });
  } catch (err) {
    console.error("Rejection error:", err);
    res.status(500).json({ message: "Server error during rejection" });
  }
};


module.exports = { registerUser , approveUser, rejectUser,loginUser};
