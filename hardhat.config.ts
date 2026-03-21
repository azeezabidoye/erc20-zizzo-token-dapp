import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { LISK_RPC_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20", // Match your contract version
  networks: {
    liskSepolia: {
      url: `${LISK_RPC_URL}` || "",
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};

export default config;
