const { generateSlug } = require("../config/slugGenerator");
const Hotel = require("../models/Hotels");

// Create a new hotel
exports.createHotel = async(req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        slug: generateSlug(req.body.name),
        location: req.body.location,
        images: req.body.images,
        rating: req.body.rating,
        country: req.body.country,
        ecoFriendlyTag: req.body.ecoFriendlyTag,
        amenities: req.body.amenities,
    });
    await hotel
        .save()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: error.message });
        });
};

// // Delete user
// exports.deleteUser = async (req, res) => {
//   try {
//     const userID = req.params.id;
//     const deletedUser = await User.deleteOne({ _id: userID });
//     res.json(deletedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };