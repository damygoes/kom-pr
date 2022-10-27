const Climb = require("../models/Climb");

const NewClimbs = [
  //   {
  //     name: "Passo del Mortirolo",
  //     slug: "passo-del-mortirolo",
  //     description:
  //       "Mortirolo is a climb in the region Lombardy. It is 12.2km long and bridges 1326 vertical meters with an average gradient of 10.8%. The top of the ascent is located at 1868 meters above sea level.",
  //     location: "Sondrio/Brescia (Lombardy)",
  //     country: "Italy",
  //     coordinates: { latitude: "46.2479", longitude: "10.2983" },
  //     distance: 12.2,
  //     avgGradient: 10.8,
  //     maxGradient: 17.7,
  //     elevation: 1326,
  //     images: [
  //       "https://images.unsplash.com/photo-1533619771522-a3a9e28a75df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9sb21pdGV8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //       "https://images.unsplash.com/photo-1439189614644-ff891ff78aa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW5zfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //       "https://images.unsplash.com/photo-1570032257806-7272438f38da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bW91bnRhaW5zfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //       "https://images.unsplash.com/photo-1436377991866-f9af228d2b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1vdW50YWlufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //       "https://images.unsplash.com/photo-1662363332703-2c5c4baa2b8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFzc28lMjBkZWxsbyUyMHN0ZWx2aW98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  //     ],
  //   },
];

//* Create New Climb
exports.seedClimbs = async (req, res) => {
  await Climb.insertMany(NewClimbs).then((data) => {
    res.status(200).json({ message: "Climbs Inserted into DB" });
  });
};
