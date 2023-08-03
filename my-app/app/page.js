"use client";

import Voting from "../components/voting"
import ConnectWalletButton from "../components/connectWalletButton"
import WrongNetworkMessage from "../components/wrongNetwork"
import HasVoted from "../components/hasVoted";

import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import { VotingContractAddress } from "../config"
import VotingABI from "../../hardhat/artifacts/contracts/Voting.sol/Voting.json"


export default function Home() {
  const [correctNet, setCorrectNet] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [candidiate, setCandidiate] = useState([])
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    connectWallet()
  }, [])

  let router = useRouter();

  const resultClick = () =>{
    router.push('/result')
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("MetaMask Not detected")
        return
      }
      let chainID = await ethereum.request({ method: 'eth_chainId' })
      console.log('Connnected to chain:', chainID)

      const sepoliaChainId = '0xaa36a7'
      if (chainID != sepoliaChainId) {
        setCorrectNet(false)
        alert("You are not connected to the sepolia testnet!")
        return
      }
      else {
        setCorrectNet(true)
      }

      const account = await ethereum.request({ method: "eth_requestAccounts" })
      console.log("Found Account:", account[0])
      setIsUserLoggedIn(true)
      setCurrentAccount(account[0])

      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const VotingContract = new ethers.Contract(
        VotingContractAddress, VotingABI.abi, signer
      )
        
      let getCandidate = await VotingContract.getRoster()
      setCandidiate(getCandidate)

      haveYouVoted()

    } catch (error) {
      console.log(error)
    }
  }

  const haveYouVoted = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        const VotingContract = new ethers.Contract(
          VotingContractAddress, VotingABI.abi, signer
        )

        let getVote = await VotingContract.hasVoted(signer.address)
        console.log("Account Number: ", signer.address)
        setHasVoted(getVote)
      }
  } catch (error){
    console.log(error)
  }
}

  const voting = async e => {

    e.preventDefault()

    let vote = {
      votingCandidate: input,
    }

    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        const VotingContract = new ethers.Contract(
          VotingContractAddress, VotingABI.abi, signer
        )
        
        VotingContract.Vote(vote.votingCandidate)
          .then(res => {
            console.log("You have voted for ", vote.votingCandidate)
          }).catch(err => {
            console.log(err)
          })
        
        setInput('')

        resultClick()

      }
      else {
        console.log("BrowserProvider object does not exist")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!isUserLoggedIn ? <ConnectWalletButton connectWallet={connectWallet} /> :
        !correctNet ? <WrongNetworkMessage /> :
        !hasVoted ?<Voting candidiate ={candidiate} input={input} setInput={setInput} voting={voting} /> : <HasVoted resultClick = {resultClick}/>}
    </div>
  )
}
