/**
 * Import dependencies
 */
const NodeCache = require("node-cache");
const appCache = new NodeCache(); // Initialize cache
const CACHE_TIME_IN_MINS = process.env.CACHE_TIME_IN_MINUTES
	? process.env.CACHE_TIME_IN_MINUTES
	: 10;
const DEFAULT_CACHE_TIME = 60 * 60 * parseInt(CACHE_TIME_IN_MINS); // in seconds (10 mins)
/**
 *
 * Store item in cache
 * @param String key
 * @param Object value
 * @param Number time in seconds
 * @return Boolean
 */
const setCacheItem = (key, value, time = DEFAULT_CACHE_TIME) => {
	// Validation
	if (typeof key !== "string") return false;
	if (typeof value !== "object") return false;

	appCache.set(key, value, time);
	return;
};

/**
 *
 * Retrieve item from cache
 * @param String key
 * @return Object with status, error and item
 */
const getCacheItem = (key) => {
	// Validation
	if (typeof key !== "string")
		return { status: false, error: "Key is not a valid string !" };

	let result = {}; //

	let value = appCache.get(key);
	if (value == undefined) {
		// handle miss!
		result = {
			status: false,
		};
	} else {
		result = {
			status: true,
			item: value,
		};
	}

	return result;
};

/**
 *
 * Delete item from cache
 * @param String key
 * @return Object with status, error and item
 */
const deleteCacheItem = (key) => {
	// Validation
	if (typeof key !== "string") return false;
	appCache.del(key);
	return true;
};

module.exports = {
	setCacheItem,
	getCacheItem,
	deleteCacheItem,
};
