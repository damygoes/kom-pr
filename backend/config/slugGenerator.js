/**
 * Generate slug from string
 * @param {String} str - string in which slug will be generated from
 * @returns String - Slug
 */
const generateSlug = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

module.exports = {
    generateSlug,
};