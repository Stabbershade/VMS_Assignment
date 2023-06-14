const { ethers } = require("hardhat")

async function main(){
  const contractFactory = await ethers.getContractFactory("Voting")
  console.log("Deploying Contract...")
  const VotingContract = await contractFactory.deploy()
  await VotingContract.waitForDeployment()
  console.log(`Contract address:${simpleStorage.target}`)
  
}

main().then(()=>process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
})