const { StardustCustodialSDK, StardustApp, StardustWallet } = require("@stardust-gg/stardust-custodial-sdk");
const { STARDUST_API_KEY, RPC_URL } = require("../../config");
const createStardustWallet = require("./createWallet");
const { providers } = require("ethers");
const getStardustWallet = require("./getWallet");

function stardust() {
	const provider = new providers.JsonRpcProvider(RPC_URL);
	const sdk = new StardustCustodialSDK(STARDUST_API_KEY);

	async function getWallet(walletId) {
		return await getStardustWallet(sdk, walletId);
	}

	return {
		createWallet: async() => createStardustWallet(sdk),
		getWallet,
		getSigner: async(walletId) => {
			const wallet = await getWallet(walletId);
			return wallet.signers.ethers.connect(provider);
		}
	}
}

module.exports = stardust();