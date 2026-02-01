const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../server/models/user");

mongoose.connect(
  "mongodb+srv://jeevan072004_db_user:JeeVan@twentytwenty.tke5mfs.mongodb.net/twentytwenty?retryWrites=true&w=majority"
);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "SECRETKEY", {
      expiresIn: "1h"
    });

    res.json({ message: "Login successful", token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
