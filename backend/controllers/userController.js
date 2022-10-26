const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

const User = require("../models/User");

//* Create a new user
exports.addNewUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashSync(req.body.password, 12),
    // confirmPassword: req.body.confirmPassword,
    admin: req.body.admin,
    savedItems: req.body.savedItems,
    profile: req.body.profile,
    avatar: req.body.avatar,
  });
  try {
    const existingUser = await User.findOne(
      {
        email: user.email,
      },
      {}
    );
    //? If user already exists
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exist",
      });
    }
    //? If user does not exist but passwords don't match
    // if (user.password !== user.confirmPassword) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Passwords don't match",
    //   });
    // }

    /**
     * {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        admin,
        savedItems,
        avatar,
        profile,
      }
     */

    // const hashedPassword = await hashSync(req.body.password, 12);
    await user.save().then((user) => {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, "Random String", { expiresIn: "1h" });
      // ! "Random String" must be the same as "opts.secretOrKey" in the "passport.js" file located in the config folder
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
          profile: user.profile,
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
    if (!existingUser) {
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
        profile: existingUser.profile,
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
