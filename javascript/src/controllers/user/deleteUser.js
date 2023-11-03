const Database = require("../../services/database/database");
const { v4: uuidv4 } = require('uuid');

// DELETE /v1/users/:id
async function deleteUser(req, res) {
	const { id } = req.params;

	if (!id) throw new Error("Controller::CreateUser::Missing Id from Body");
	
	const { message } = await database.delete(id);

	return res.status(201).send({
		message: "User Deleted Successfully"
	});	
}

module.exports = deleteUser;