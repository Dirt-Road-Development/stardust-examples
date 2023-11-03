const { stardust } = require("../../services/stardust");
const { token } = require("../../services/token");
const Database = require("../../services/database/database");
const { v4: uuidv4 } = require('uuid');
const { ADMIN_PRIVATE_KEY } = require("../../config");
const { Wallet, utils } = require("ethers");

// PUT /v1/users - JSON
async function mintTokens(req, res) {
	
	const { id } = req.body;

	if (!id) throw new Error("Controller::MintTOkens::Missing Id from Body");

	try {
		const user = await Database.load(id);
		const wallet = await stardust.getSigner(user.walletId);
		const adminSigner = new Wallet(ADMIN_PRIVATE_KEY).connect(token.provider);
		const contract = await token.getContract(adminSigner);
		const mint = await contract.mintByOwner(await wallet.getAddress(), utils.parseEther("0.005"));

		return res.status(200).send({
			message: "User Created Successfully",
			data: {
				mint
			}
		});
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal Server Error");
	}
}

module.exports = mintTokens;