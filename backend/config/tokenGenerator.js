const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
/**
 * Generate random token
 * @param {*} length - length of strings to be generated
 * @returns String - Token
 */
const generateToken = (length = 10) => {
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i <= length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};

module.exports = {
	generateToken,
};
