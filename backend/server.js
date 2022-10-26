const express = require("express");
const app = express();
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
require("dotenv/config");

//* Import Routes
const climbsRoute = require("./routes/climbs");
const savedClimbsRoute = require("./routes/savedClimbs");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

const PORT = process.env.PORT || 5000;

//* MIDDLEWARE
const cors = require("cors");
app.use(cors(corsOptions)); //* Cross Origin Resource Sharing
// const passport = require("passport");
// require("./config/passport");
app.use(bodyParser.json());
app.use(logger);
// app.use(passport.initialize());
app.use("/", climbsRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/savedClimbs", savedClimbsRoute);

//* CONNECT TO DB
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

//* Listening to the server
app.listen(PORT, () => {
  console.log(`Connected to Server on port ${PORT}`);
});
