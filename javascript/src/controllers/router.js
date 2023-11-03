const { Router } = require("express");
const {
	createUser,
	deleteUser,
	loginUser
} = require("./user");
const {
	mint
} = require("./token");

const router = Router();

/**
 * USER Routes
 */
router.put("/users", createUser);
router.delete("/users/:id", deleteUser);
router.post("/users", loginUser);

/**
 * TOKEN Routes
 */
router.post("/token/mint", mint);

module.exports = router;

