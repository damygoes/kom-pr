const express = require("express");
const router = express.Router();
const Climb = require("../models/Climb");
const Admin = require("../models/Admin");
const { generateToken } = require("../config/tokenGenerator");
const authMiddleware = require("../middleware/auth");
const { setCacheItem, getCacheItem } = require("../config/cache");

// MONGO COLLECTION CONNECT

// Post a Climb
router.post("/", async (req, res) => {
  const climb = new Climb({
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    location: req.body.location,
    country: req.body.country,
    distance: req.body.distance,
    avgGradient: req.body.avgGradient,
    maxGradient: req.body.maxGradient,
    elevation: req.body.elevation,
    image: req.body.image,
    liked: req.body.liked,
  });
  await climb
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});
// Get All
router.get("/", async (req, res) => {
  try {
    const data = await Climb.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get by Name
router.get("/climbs/:name", async (req, res) => {
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
});
// Get a random climb
router.get("/random", async (req, res) => {
  try {
    const randomClimb = await Climb.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomClimb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Group climbs by Country
router.get("/countries/:country", async (req, res) => {
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
});

// Update a Climb by Name
router.patch("/climbs/:name", async (req, res) => {
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
});
// Delete a Climb by Name
router.delete("/climbs/:id", authMiddleware, async (req, res) => {
  try {
    const climbID = req.params.id;
    const removedClimb = await Climb.deleteOne({ _id: climbID });
    res.json(removedClimb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Routes
// Login
router.post("/login", async (req, res) => {
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
});
// Create a new admin user
router.post("/admin/create", async (req, res) => {
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
});

module.exports = router;
