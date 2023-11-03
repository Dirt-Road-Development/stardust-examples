const dotenv = require("dotenv");

/**
 *  Path to Root of Directory for Sharing Between All Examples
 * Change to dotenv.config() for single use
 */
dotenv.config({ path: "../.env" });

const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
const STARDUST_API_KEY = process.env.STARDUST_API_KEY;
const PORT = process.env.PORT ?? 4444;

if (!ADMIN_PRIVATE_KEY) throw new Error("Config::Dotenv:Missing ADMIN_PRIVATE_KEY");
if (!STARDUST_API_KEY) throw new Error("Config::Dotenv:Missing STARDUST_API_KEY");

module.exports = {
	ADMIN_PRIVATE_KEY,
	STARDUST_API_KEY,
	PORT,
	RPC_URL: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix"
}
