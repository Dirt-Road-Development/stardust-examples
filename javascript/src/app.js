const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

function Application() {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(helmet());

	app.set("trust proxy", true);

	app.use(logger("tiny"));

	return app;
}

module.exports = Application;