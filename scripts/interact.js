const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

const { ethers } = require("hardhat")

//Initialising Provider, ABI and Signer
const contractabi = require("../artifacts/contracts/Voting.sol/Voting.json")
const Provider = new ethers.EtherscanProvider(network = "sepolia", ETHERSCAN_API_KEY)
const Signer = new ethers.Wallet(PRIVATE_KEY, Provider)

//Deployed contract is used
const VotingContract = new ethers.Contract(CONTRACT_ADDRESS, contractabi.abi, Signer)

//Interaction with Contract that was deployed
async function main() {
    let currentCandidate = await VotingContract.getRoster()
    console.log(`Roster list: ${currentCandidate}`)

    var voteRespond;
    for (let i = 0; i < currentCandidate.length; i++) {
        voteRespond = await VotingContract.getCandidate(currentCandidate[i])
        console.log(`${currentCandidate[i]}'s vote count is: ${voteRespond}`)
    }

    // Vote between John , Sam , Bob , (default John)
    console.log("-----------Voting-------------")
    await VotingContract.Vote("John")
    const updatedResult = await VotingContract.getResult()
    console.log(`The Candidate with the most vote is : ${updatedResult}`)
    voteRespond = await VotingContract.getCandidate("John")
    console.log(`John's vote count is: ${voteRespond}`)
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1)
})