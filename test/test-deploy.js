const {ethers} = require("hardhat")
const {assert} = require("chai")
 
describe("Voting", function() {
  let VotingFactory , VotingContract;
  const testCase1 = ["John","Mary","Bob"]
  beforeEach(async function(){
    VotingFactory = await ethers.getContractFactory("Voting")
    VotingContract = await VotingFactory.deploy(testCase1)
    await VotingContract.waitForDeployment()
  })
  it("Should get retrieved value as 0", async function(){
    let currentValue;
    const expectedValue = "0"
    for(let i = 0 ; i < testCase1.length; i++){
      currentValue = await VotingContract.getCandidate(testCase1[i])
      assert.equal(currentValue,expectedValue)
    }
  })
  it("Should allow Sender to vote for a Candidate", async function(){
    await VotingContract.Vote(testCase1[0])
    let currentValue = await VotingContract.getCandidate(testCase1[0])
    const expectedValue = "1"
    assert.equal(currentValue,expectedValue)
  })
  it("Should not allow Sender to send more than one vote", async function(){
    try{
      await VotingContract.Vote(testCase1[0])
      await VotingContract.Vote(testCase1[0])
      assert.equal(1,0)
    } catch(e){
      assert.equal(1,1)
    }
  })
  it("Should get the most voted candidate", async function(){
    await VotingContract.Vote(testCase1[1])
    const expectedValue = "Mary"
    const currentValue = await VotingContract.getResult()
    assert.equal(currentValue[0],expectedValue)
  })

})