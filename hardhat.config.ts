import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

// const { LISK_RPC_URL, ETHERSCAN_API_KEY } = process.env;
// const { LISK_RPC_URL, PRIVATE_KEY } = process.env;

// const config: HardhatUserConfig = {
//   solidity: "0.8.20", // Match your contract version
//   networks: {
//     liskSepolia: {
//       url: `${LISK_RPC_URL}` || "",
//       accounts: [`0x${PRIVATE_KEY}`],
//     },
//   },
// };

// Contract verification via Solidity Hardhat plugin
// const config: HardhatUserConfig = {
//   solidity: "v0.8.20", // replace if necessary
//   networks: {
//     liskSepolia: {
//       url: `${LISK_RPC_URL}`,
//     },
//   },
//   etherscan: {
//     apiKey: {
//       liskSepolia: `${ETHERSCAN_API_KEY}`,
//     },
//     customChains: [
//       {
//         network: `${LISK_RPC_URL}`,
//         chainId: 4202,
//         urls: {
//           apiURL: "https://sepolia-blockscout.lisk.com/api",
//           browserURL: "https://sepolia-blockscout.lisk.com",
//         },
//       },
//     ],
//   },
// };
// export default config;

////////////////////////////////////////////////////
///////////// BLOCKSCOUT VERIFICATION CODE /////////////
////////////////////////////////////////////////////

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20", // use your actual version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "lisk-sepolia-testnet": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      "lisk-sepolia-testnet": "empty",
    },
    customChains: [
      {
        network: "lisk-sepolia-testnet",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
};

export default config;

// npx hardhat ignition deploy ./ignition/modules/ZizzoToken.ts --network liskSepolia

// npx hardhat verify --network liskSepolia 0xaB40E66441E15D597F4587FA07Fbee909c4BD974

// npx hardhat verify --network lisk-sepolia-testnet 0xaB40E66441E15D597F4587FA07Fbee909c4BD974 0xCD30EA918A09FbdCB7421f5227d5eEB97fBBC25c
