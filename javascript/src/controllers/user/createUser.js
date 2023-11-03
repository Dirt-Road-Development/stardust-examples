const { stardust } = require("../../services/stardust");
const Database = require("../../services/database/database");
const { v4: uuidv4 } = require('uuid');

// PUT /v1/users - JSON
async function createUser(req, res) {
	
	const { name, email, password } = req.body;

	if (!name) throw new Error("Controller::CreateUser::Missing Name from Body");
	if (!email) throw new Error("Controller::CreateUser::Missing Email from Body");
	if (!password) throw new Error("Controller::CreateUser::Missing Password from Body");

	const wallet = await stardust.createWallet(); /// Stardust Wallet

	const { message } = await Database.create(uuidv4(), {
		name,
		email,
		password, // In production this should be secured. For demo purposes, no extra security measures are taken.
		walletId: wallet.id
	});

	return res.status(200).send({
		message: "User Created Successfully"
	});	
}

module.exports = createUser;