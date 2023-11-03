const Database = require("../../services/database/database");

// POST /v1/users
async function loginUser(req, res) {

	const { email, password } = req.body;

	if (!email) throw new Error("Controller::CreateUser::Missing Email from Body");
	if (!password) throw new Error("Controller::CreateUser::Missing Password from Body");
	const entries = Object.entries(await Database.loadAll());
	
	for (const [key, value] of entries) {
		if (value["email"] === email.toLowerCase().trim() && value["password"] === password) {
			return res.status(200).send({
				message: "User Found",
				data: {
					userId: key
				}
			});
		}
	}

	return res.status(401).send({
		message: "Unauthorized Access: User Account May not Exist"
	});	
}

module.exports = loginUser;