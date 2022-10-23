const Climb = require("../models/Climb");

//* Get All
exports.getClimbs = async (req, res) => {
  try {
    const data = await Climb.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Get by Name
exports.getClimbByName = async (req, res) => {
  try {
    const climbName = req.params.name;
    const data = await Climb.findOne(
      {
        name: { $regex: climbName, $options: "i" },
      },
      {}
    );
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Get a random climb
exports.getRandomClimb = async (req, res) => {
  try {
    const randomClimb = await Climb.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomClimb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Group climbs by Country
exports.getClimbByCountry = async (req, res) => {
  try {
    const countryName = req.params.country;
    const data = await Climb.find(
      {
        country: { $regex: countryName, $options: "i" },
      },
      {}
    );
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Post a Climb
exports.addClimb = async (req, res) => {
  const climb = new Climb({
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    location: req.body.location,
    coordinates: req.body.coordinates,
    country: req.body.country,
    distance: req.body.distance,
    avgGradient: req.body.avgGradient,
    maxGradient: req.body.maxGradient,
    elevation: req.body.elevation,
    images: req.body.images,
  });
  await climb
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
//* Update a Climb by Name
exports.editClimb = async (req, res) => {
  try {
    const climbName = req.params.name;
    const updatedData = req.body;
    const options = { new: true };
    const data = await Climb.findOneAndUpdate(
      { $regex: climbName, $options: "i" },
      updatedData,
      options
    );
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//* Delete a Climb by Name
exports.deleteClimb = async (req, res) => {
  try {
    const climbID = req.params.id;
    const removedClimb = await Climb.deleteOne({ _id: climbID });
    res.json(removedClimb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
