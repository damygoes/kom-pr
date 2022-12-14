const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

const User = require("../models/User");

//* Create a new user
exports.addNewUser = async (req, res) => {
  try {
    const existingUser = await User.findOne(
      {
        email: req.body.email,
      },
      {}
    );
    //? If user already exists
    if (existingUser !== null) {
      return res.status(400).send({
        success: false,
        message: "User already exist",
      });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashSync(req.body.password, 12),
      admin: req.body.admin,
      savedItems: req.body.savedItems,
      avatar: req.body.avatar,
      ftp: req.body.ftp,
      weight: req.body.weight,
      wattPerKilo: req.body.wattPerKilo,
      bikeWeight: req.body.bikeWeight,
      gender: req.body.gender,
      location: req.body.location,
    });
    await user.save().then((user) => {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, "Random String", { expiresIn: "1h" });
      // ! "Random String" must be the same as in the "auth.js" file located in the middleware folder
      return res.status(200).send({
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          admin: user.admin,
          avatar: user.avatar,
          savedItems: user.savedItems,
          ftp: user.ftp,
          weight: user.weight,
          wattPerKilo: user.wattPerKilo,
          bikeWeight: user.bikeWeight,
          gender: user.gender,
          location: user.location,
          token: token,
        },
      });
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

//* Login a user
exports.logInUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const existingUser = await User.findOne(
      {
        email: userEmail,
      },
      {}
    );
    //? If no userfound
    if (existingUser === null) {
      return res.status(404).send({
        success: false,
        message: "User doesn't exist",
      });
    }
    //? If user found, then compare passwords
    //? if passwords doesn't match
    if (!compareSync(userPassword, existingUser.password)) {
      return res.status(401).send({
        success: false,
        message: "Password Incorrect",
      });
    }
    //* if passwords match, send a JWT
    const payload = {
      email: existingUser.email,
      id: existingUser._id,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // ! "Random String" must be the same as "opts.secretOrKey" in the "passport.js" file located in the config folder
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        admin: existingUser.admin,
        avatar: existingUser.avatar,
        savedItems: existingUser.savedItems,
        ftp: existingUser.ftp,
        weight: existingUser.weight,
        wattPerKilo: existingUser.wattPerKilo,
        bikeWeight: existingUser.bikeWeight,
        gender: existingUser.gender,
        location: existingUser.location,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Update user info
exports.updateUserInfo = async (req, res) => {
  const userID = req.params.id;
  const userProfileData = req.body;
  const objectifiedUserID = ObjectId(userID);
  const newUserData = {
    ftp: userProfileData.ftp,
    weight: userProfileData.weight,
    wattPerKilo: userProfileData.wattPerKilo,
    bikeWeight: userProfileData.bikeWeight,
    gender: userProfileData.gender,
    location: userProfileData.location,
  };

  try {
    const updatedUserProfile = await User.findOneAndUpdate(
      { _id: objectifiedUserID },
      newUserData,
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Profile Updated",
      updatedUserProfile,
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//* Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const deletedUser = await User.deleteOne({ _id: userID });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
