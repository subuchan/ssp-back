const express = require("express");
const  {
  registerUser,
  approveUser,
  rejectUser,loginUser} = require("../controllers/userController.js");
const UserRequest = require("../models/UserRequest.js");

const router = express.Router();

// Register (user signup)
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/login", loginUser);

// Get all pending requests (for admin)
router.get("/userrequests", async (req, res) => {
  const requests = await UserRequest.find({ status: "pending" }).sort({ createdAt: -1 });
  res.json(requests);
});

// Approve or reject requests
router.post("/approve/:requestId", approveUser);
router.post("/reject/:requestId", rejectUser);

module.exports = router;