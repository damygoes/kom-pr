const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

const User = require("../models/User");

//* Create a new user
exports.addNewUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashSync(req.body.password, 10),
    admin: req.body.admin,
    savedItems: req.body.savedItems,
    profile: req.body.profile,
    avatar: req.body.avatar,
  });
  await user
    .save()
    .then((user) => {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, "Random String", { expiresIn: "1d" });
      // ! "Random String" must be the same as "opts.secretOrKey" in the "passport.js" file located in the config folder
      return res.status(200).send({
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          admin: user.admin,
          avatar: user.avatar,
          savedItems: user.savedItems,
          profile: user.profile,
          token: `Bearer ${token}`,
        },
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    });
};

//* Login a user
exports.logInUser = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const user = await User.findOne(
      {
        email: userEmail,
      },
      {}
    );
    //? If no userfound
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }
    //? If user found, then compare passwords
    //? if passwords doesn't match
    if (!compareSync(userPassword, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Password Incorrect",
      });
    }
    //* if passwords match, send a JWT
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, "Random String", { expiresIn: "1d" });
    // ! "Random String" must be the same as "opts.secretOrKey" in the "passport.js" file located in the config folder
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        admin: user.admin,
        avatar: user.avatar,
        savedItems: user.savedItems,
        profile: user.profile,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Update user info
exports.updateUserInfo = async (req, res) => {
  const userID = req.params.id;
  const userProfileData = req.body.userData;
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
      {
        profile: newUserData,
      },
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
