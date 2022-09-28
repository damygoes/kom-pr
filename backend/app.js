const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const PORT = 5000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// IMPORT ROUTES
const climbsRoute = require("./routes/climbs");
// ### Use Middleware
app.use("/", climbsRoute);
const usersRoute = require("./routes/users");
// ### Use Middleware
app.use("/", usersRoute);

// CONNECT TO DB
mongoose
  .connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.log(e));

// Listening to the server
app.listen(PORT, () => {
  console.log(`Connected to Server on port ${PORT}`);
});
