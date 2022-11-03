const whitelist = [
  "https://kom-pr.vercel.app",
  // ** Remove the last three after development as well as !origin and leave the top one as the website where your react app is deployed.
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSucessStatus: 200,
};

module.exports = corsOptions;
