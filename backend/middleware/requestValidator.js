const { validationResult } = require("express-validator");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const requestValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        error_exists = true;
        res
            .status(422)
            .json({ message: "An error has occurred !", errors: errors.array() });
    } else {
        next();
    }
};

module.exports = requestValidator;