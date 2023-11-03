const Application = require("./app");
const chalk = require("chalk");
const { PORT } = require("./config");
const Database = require("./services/database/database");
const MemoryDatabase = require("./services/database/memory");
const { router } = require("./controllers");

async function main() {
	const app = Application();
		
	/**
	 * Define the datastore before the application starts
	 * This currently uses in-memory database to quickly showcase stardust
	 * This can be replace with your own class, however should adhere to the same create, update, delete, load functions
	 */
	const inMemoryDatabase = new MemoryDatabase("User", "object", {
		"name": true,
		"email": true,
		"password": true,
		"walletId": true
	});
	
	Database.setInstance(inMemoryDatabase);

	app.use("/v1", router);

	app.listen(PORT, () => console.log(chalk.green("Listening on PORT: ", PORT)));
}

main()
	.catch((err) => {
		console.error(chalk.red(err));
		process.exitCode = 1;
	});