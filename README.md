# VMS_Assignment

## Description
A voting management system that enables users to vote for their favorite candidate in an election. The smart contract would handle vote casting, tallying, and result reporting.

**Project Requirements:**
Your project should meet the following requirements:

1. Use Solidity to create a smart contract that demonstrates the use of variables, functions, and events.
2. Use Remix to compile and deploy your smart contract to a test network such as Goerli or Sepolia.
3. **Optional:** Compile and deploy your smart contract using Hardhat.
4. Write a detailed README file that explains how to deploy and test your smart contract and includes a description of your project and any relevant information.

### Prerequisites

* Sign up and get a free API Key from Alchemy for Sepolia or Goerli at [https://dashboard.alchemy.com/](https://dashboard.alchemy.com/)

* Sign up and get a free API Key from Etherscan at [https://etherscan.io/apis](https://etherscan.io/apis)


## Installation

1. Download VMS_Assignment repository into local directory
```bash
git clone https://github.com/Stabbershade/VMS_Assignment.git

```
2. Go to downloaded directory and Use the package manager [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) to download all dependencies.
```bash
yarn
```

3. Change the `.env.example` to `.env` and fill in respective environment variable. `CONTRACT_ADDRESS` can be left untouched.
   `API_KEY` is part of the RPC_URL. 
    * Example using Alchemy SEPLOIA_RPC_URL: `https://eth-sepolia.g.alchemy.com/v2/1234f13f13`
                            SEPLOIA_API_KEY: `1234f13f13`

### Executing program


Preferred network used can be either Sepolia or Goerli testnet.

* Deploy the contracts with `deploy.js` preferred network. Example `sepolia`.
```bash
yarn hardhat run .\scripts\deploy.js --network sepolia
```

* Either use default `CONTRACT_ADDRESS` or copy the contract address in `.env` that was given from the logs from `deploy.js`
```
CONTRACT_ADDRESS= <Contract Address> 
```

* Interact with existing contract with `interact.js` using Etherscan as a Provider and sepolia again.
```bash
yarn hardhat run .\scripts\interact.js --network sepolia
```

### Testing

* Able to test `Voting.sol` with `test-deploy.js` using local hardhat
```bash
yarn hardhat test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)