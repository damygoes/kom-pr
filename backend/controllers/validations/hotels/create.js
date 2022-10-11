/**
 *
 * Imports
 */
const { check } = require('express-validator');

/**
 * Outputs validation rules
 * Pass as an express middleware
 */
const createHotelValidation = [
    check("name").isString().notEmpty(),
    check("rating").isString().notEmpty(),
    check("country").isString().notEmpty(),
    check("ecoFriendlyTag").notEmpty().isBoolean(),
    check("images").optional({ nullable: true }).isArray().custom((value) => {
        if (value !== null && value.length > 0) {
            value.forEach(element, index => {
                if (typeof element !== 'string') return Promise.reject(`Image: ${element} at position ${index} should be a string!`);
            });
        }
    }),
    check("location").optional({ nullable: true }).isObject().custom((value) => {
        if (value !== null && value.length > 0) {
            if (!'latitude' in value) return Promise.reject("Latitude is required!");
            if (!'longitude' in value) return Promise.reject("Longitude is required!");
        }
    }),
    check("amenities").notEmpty().isArray().custom((value) => {
        if (value !== null && value.length > 0) {
            value.forEach(element, index => {
                if (typeof element !== 'object') return Promise.reject(`Item: ${element} at position ${index} should be an object!`);
            });
        }
    }),
];

module.exports = {
    createHotelValidation,
};