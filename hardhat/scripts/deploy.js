const { ethers } = require("hardhat")

//Default TestCase
const DefaultTest = ["John", "Sam", "Bob"]

async function main() {

  const contractFactory = await ethers.getContractFactory("Voting")
  console.log("Deploying Contract...")
  const VotingContract = await contractFactory.deploy(DefaultTest)
  await VotingContract.waitForDeployment()
  console.log(`Contract address:${VotingContract.target}`)

}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
})