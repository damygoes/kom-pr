const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split("")[1];
  if (token == null) return res.status(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });

  // const token = req.headers.authorization.split(" ")[1];
  // const isCustomAuth = token.length < 500; //if > 500, that is Google Auth

  // let decodedData;

  // if (token && isCustomAuth) {
  //   decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //   req.userId = decodedData?.id;
  // } else {
  //   decodedData = jwt.decode(token);
  //   req.userId = decodedData?.sub; //sub is an id that google uses to differentiate users
  // }
};

module.exports = authMiddleware;
