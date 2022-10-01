const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
require("dotenv/config");
// Import Routes
const climbsRoute = require("./routes/climbs");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors(corsOptions)); //Cross Origin Resource Sharing
app.use(bodyParser.json());
app.use(logger);
app.use("/", climbsRoute);
// app.use("/user", userRoute);
// app.use("/admin", adminRoute);

// IMPORT ROUTES

// ### Use Middleware
// const usersRoute = require("./routes/users");

// ### Use Middleware
// app.use("/", usersRoute);

// CONNECT TO DB
mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.log(e));

app.use(errorHandler);
// Listening to the server
app.listen(PORT, () => {
  console.log(`Connected to Server on port ${PORT}`);
});
