# VMS_Assignment

## Description
A voting management system that enables users to vote for their favorite candidate in an election. The smart contract would handle vote casting, tallying, and result reporting.

**Project Requirements:**
Your project should meet the following requirements:

1. Use Solidity to create a smart contract that demonstrates the use of variables, functions, and events.
2. Use Remix to compile and deploy your smart contract to a test network such as Goerli or Sepolia.
3. Compile and deploy your smart contract using Hardhat.
4. Write a detailed README file that explains how to deploy and test your smart contract and includes a description of your project and any relevant information.
5. Develop a DApp that solves a real-world problem or provides a useful service to users.
6. The DApp should have a user-friendly interface built with React and Next.js
7. The back-end should be implemented using Node.js
8. The DApp should use Ethereum as the underlying blockchain technology
9. Implement smart contracts that handle the core functionality of the DApp
10. Ensure the security and reliability of the DApp by thoroughly testing it using Hardhat 

### Prerequisites

* Sign up and get a free API Key from Alchemy for Sepolia or Goerli at [https://dashboard.alchemy.com/](https://dashboard.alchemy.com/)

* Sign up and get a free API Key from Etherscan at [https://etherscan.io/apis](https://etherscan.io/apis)




## Installation in HardHat Folder

1. Download VMS_Assignment repository into local directory
```bash
git clone https://github.com/Stabbershade/VMS_Assignment.git
```

2. Go to downloaded directory , into the hardhat directory
```bash
cd harthat
```

Use the package manager [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) to download all dependencies in the hardhat foler
```bash
yarn
```

3. Change the `.env.example` to `.env`.


4. Fill up respective environment variable. `CONTRACT_ADDRESS` can be left untouched.
   `API_KEY` is part of the RPC_URL. 
    * Example using Alchemy SEPLOIA_RPC_URL: `https://eth-sepolia.g.alchemy.com/v2/1234f13f13`
                            SEPLOIA_API_KEY: `1234f13f13`

    `PRIVATE_KEY` will be the private key from your MetaMask. DO NOT SHARE IT WITH ANYONE!

### Executing program

Preferred network used can be Sepolia testnet.

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

### Testing on the Sepolia Network

* Interact with existing contract with `interact.js` using Etherscan as a Provider and sepolia again.
```bash
yarn hardhat run .\scripts\interact.js --network sepolia
```

### Testing Solidity code

* Able to test `Voting.sol` with `test-deploy.js` using local hardhat
```
yarn hardhat test
```
## Installation in my-app Folder

1. Change directory to the my-app directory
```bash
cd my-app
```

2. Install ethers and nextjs with NPM for dependencies
```bash
npm install -g npx
npx create-next-app@latest ./
npm isntall ethers
```

3. Make sure to run the hardhat portion of the code first for
the `artifact` folder to populate

4. Ensure the `CONTRACT_ADDRESS` field is filled up in the `jsconfig.js` file. Default Address has been provided.

### Executing program

1. start the Nextjs with `localhost:3000`
```bash
npm run dev
```

## License
[MIT](https://choosealicense.com/licenses/mit/)