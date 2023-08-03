"use client";
import { useState , useEffect } from "react"
import GetResult from "../../components/getResult"
import {ethers} from "ethers"

import { VotingContractAddress } from "../../config"
import VotingABI from "../../../hardhat/artifacts/contracts/Voting.sol/Voting.json"

export default function Home(){

    const [candidateResult , setCandidiateResult] = useState([])

    useEffect(()=>{
        GetCandidateResult()
    },[])

    const GetCandidateResult = async () => {

        try {
          const { ethereum } = window
          if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum)
            const signer = await provider.getSigner()
            const VotingContract = new ethers.Contract(
              VotingContractAddress, VotingABI.abi, signer
            )
                
            let getCandidateResult = await VotingContract.getResult()
            setCandidiateResult(getCandidateResult)   
            console.log(candidateResult)

          }
      } catch (error){
        console.log(error)
      }
    }
    return(
        <GetResult candidateResult = {candidateResult} />
    )
}