const passport = require("passport");
require("../config/passport");

const jwtAuth = passport.authenticate("jwt", { session: false });

module.exports = jwtAuth;
