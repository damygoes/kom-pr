const AllClimbs = require("../models/Climb");
const SavedClimbs = require("../models/SavedClimbs");
const ObjectId = require("mongodb").ObjectId;

// * Save a climb
exports.saveOneClimb = async (req, res) => {
  const userID = req.body.user;
  const climbID = req.body.climbID;

  // ? Check if climb already exist
  const climb = await SavedClimbs.findOne(
    {
      climbID: climbID,
      userID: userID,
    },
    {}
  );
  if (climb) {
    return res.status(400).json({
      success: false,
      message: "Already added to favourites",
    });
  } else {
    const savedClimb = new SavedClimbs({
      userID,
      climbID,
    });
    await savedClimb
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Added to favourites",
          data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: "Something went wrong",
          error: error,
        });
      });
  }
};

// * Get all saved climbs
exports.getSavedClimbs = async (req, res) => {
  const userID = req.params.id.toString();
  try {
    const objectifiedIDS = [];
    const userItems = await SavedClimbs.find({ userID }, { climbID: 1 });
    for (let index = 0; index < userItems.length; index++) {
      const objectClimbID = ObjectId(userItems[index].climbID);
      objectifiedIDS.push(objectClimbID);
    }
    const savedClimbs = await AllClimbs.find(
      { _id: { $in: objectifiedIDS } },
      {}
    );
    res.status(200).send({
      success: true,
      savedClimbs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// * Delete a saved climb
exports.deleteSavedClimb = async (req, res) => {
  try {
    const climbId = req.body.climbID;
    const userId = req.body.userID;
    const deletedClimb = await SavedClimbs.deleteOne({
      climbID: climbId,
      userID: userId,
    });
    res.json(deletedClimb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
