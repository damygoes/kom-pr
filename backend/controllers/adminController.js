const Admin = require("../models/Admin");
const { generateToken } = require("../config/tokenGenerator");
const { setCacheItem, getCacheItem } = require("../config/cache");

// Login
exports.logInAdmin = async (req, res) => {
  try {
    const adminEmail = req.body.email;

    const data = await Admin.findOne(
      {
        email: adminEmail,
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
};
// Create a new admin user
exports.addAdmin = async (req, res) => {
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    token: await generateToken(15),
  });
  await admin
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
