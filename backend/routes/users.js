const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Admin Routes
// Login
router.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const data = await Admin.findOne(
      {
        email: userEmail,
        password: userPassword,
      },
      {}
    );

    if (data.token) {
      // Cache token
      setCacheItem(data.token, data);
    }
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create a new user
router.post("/user/create", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      //   res.status(400).json({ message: error.message });
    });
});

// Delete user
router.delete("/user/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const deletedUser = await User.deleteOne({ _id: userID });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
