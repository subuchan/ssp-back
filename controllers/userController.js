const User = require('../models/User');

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ status_code: 200, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getUserById };
