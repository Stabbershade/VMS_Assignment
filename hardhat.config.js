require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.18",
  networks:{
    sepolia:{
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1500000000
    },
    goerli:{
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1500000000
    },
    hardhat :{}
  },
  gasReporter:{
    enabled : true,
    noColors: true
  }
};
