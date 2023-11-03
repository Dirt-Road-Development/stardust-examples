import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

import "hardhat-deploy";
import "hardhat-deploy-ethers";

dotenv.config({ path: "../.env" });

const PRIVATE_KEY: string | undefined = (process.env.ADMIN_PRIVATE_KEY as string | undefined);
if (!PRIVATE_KEY) {
	throw new Error("Private Key Not Found");
}

task("mint", "Mint ExampleToken")
 	.setAction(async(taskArgs: any, hre) => {
		const config = await hre.deployments.get("ExampleToken");
		const [ signer ] = await hre.ethers.getSigners();
		const contract = await hre.ethers.Contract(config.address, config.abi, signer);
		const wallet = hre.ethers.Wallet.createRandom();
		const res = await contract.mint(wallet.address, ethers.utils.parseEther("1"));
 	});

const config: HardhatUserConfig = {
	solidity: "0.8.20",
	/// Required to work with hardhat deploy and the auatomation
	namedAccounts: {
		deployer: 0 
	},
	networks: {
		"chaos": {
			accounts: [PRIVATE_KEY],
			url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix"
		},
	},
	etherscan: {
		apiKey: {
			"chaos": "api-key-does-not-matter"
		},
		customChains: [
			 {
				network: "chaos",
				chainId: 1351057110,
				urls: {
					apiURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/api",
					browserURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com"
				}
			}
		]
	}
};

export default config;