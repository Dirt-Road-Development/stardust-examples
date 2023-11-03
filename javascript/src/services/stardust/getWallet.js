async function getWallet(sdk, walletId) {
	return await sdk.getWallet(walletId); // StardustWallet type
}

module.exports = getWallet;