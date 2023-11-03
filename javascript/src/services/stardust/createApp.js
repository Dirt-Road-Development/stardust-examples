/**
 * This script should only be used if an API Key does not yet exist
 * Requires activatoin by the Stardust team
 */
const { StardustCustodialSDK, StardustApp } = require("@stardust-gg/stardust-custodial-sdk");

async function createStardustApp(name, email, description = null) {

	// create the local app object
	const app: StardustApp = new StardustApp(name, email, description);

	// create an instance of the App with the StardustAPI. Modifies the app object with extra properties
	await StardustCustodialSDK.CreateApp(app); // also returns the app object if you prefer to be explicit

	// save your apiKey however you like
	return app;
}