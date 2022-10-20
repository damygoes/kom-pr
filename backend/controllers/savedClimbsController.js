const AllClimbs = require("../models/Climb");
const SavedClimbs = require("../models/SavedClimbs");
const ObjectId = require("mongodb").ObjectId;

// * Save a climb
exports.saveOneClimb = async (req, res) => {
  const userID = req.body.userID;
  const climbID = req.body.climbID;
  console.log(userID);
  console.log(climbID);

  // ? Check if climb already exist
  const climb = await SavedClimbs.findOne(
    {
      climbID,
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
  const userID = req.user._id.toString();
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
