const { Contract, providers } = require("ethers");
const { RPC_URL } = require("../../config");
const { address, abi } = require("../../../../contracts/deployments/chaos/ExampleToken.json");

function token() {
	const provider = new providers.JsonRpcProvider(RPC_URL);
	const contract = new Contract(address, abi, provider);
	return {
		contract,
		provider,
		getContract: (signer) => contract.connect(signer)
	}
}

module.exports = token();