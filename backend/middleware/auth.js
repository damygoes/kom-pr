/**
 *
 * Imports
 */
const { getCacheItem } = require("../config/cache");
/**
 * Checks for authorization token on request
 * Requests must contain token in header e.g Authorization: Bearer XYZ1234
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Not authenticated !" });

  const authHeader = req.headers.authorization.split(" ");

  let authData = {
    status: false,
  };

  authData = getCacheItem(`${authHeader[1]}`); // Get token from cache

  if (authData.status !== true)
    return res.status(403).json({ message: "Not Authorized !" });

  next();
};

module.exports = authMiddleware;
