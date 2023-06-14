const { ethers } = require("hardhat")
const DefaultTest = ["John","Sam","Bob"]

async function main(){

  const contractFactory = await ethers.getContractFactory("Voting")
  console.log("Deploying Contract...")
  const VotingContract = await contractFactory.deploy(DefaultTest)
  await VotingContract.waitForDeployment()
  console.log(`Contract address:${VotingContract.target}`)

  //Interacting with the contract 
  const currentCandidate = await VotingContract.Winner()
  console.log(`The Candidate with the most vote are/is: ${currentCandidate}`)
 
  for(let i = 0; i< DefaultTest.length; i++){
    var voteRespond = await VotingContract.getSpecficResult(DefaultTest[i])
    console.log(`${DefaultTest[i]}'s vote count is: ${voteRespond}`)
  }

}

main().then(()=>process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
})