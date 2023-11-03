async function createWallet(sdk) {
	return await sdk.createWallet(); // StardustWallet
}

module.exports = createWallet;