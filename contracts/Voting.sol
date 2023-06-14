// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


//A voting management system that enables users to vote for their favorite candidate in an election. 
//The smart contract would handle vote casting, tallying, and result reporting.

contract Voting{

    struct Voter {
        uint8 exist;
        bool hasVoted;
        string votedFor;
    }
    
    struct Candidate{
        uint8 exist;
        string name;
        uint voteCount;
    }

    address public immutable owner;
    mapping (address => Voter) public voters;
    mapping (string => Candidate) private candidates;
    string[] private storeCandidate; 

    constructor(string[] memory _candidiate){
        owner = msg.sender;
        for(uint i = 0 ; i < _candidiate.length; i++){
            candidates[_candidiate[i]] = Candidate({exist: 1 , name: _candidiate[i] , voteCount: 0});
            storeCandidate = _candidiate;
        }
    }

    function voteForCandidate(string memory candidateName) public VoteOnce nameExist(candidateName){
        candidates[candidateName].voteCount += 1;
        voters[msg.sender].votedFor = candidateName;
        voters[msg.sender].hasVoted = true;
    }

    function getSpecficResult(string memory candidateName) public nameExist(candidateName) view returns(uint) {
        return candidates[candidateName].voteCount;
    }

    function Winner() public view returns(string memory){
        uint min = 0;
        string memory winner = " ";
        for(uint i = 0 ; i < storeCandidate.length; i++){
            if(getSpecficResult(storeCandidate[i]) > min){
                min = getSpecficResult(storeCandidate[i]);
                winner = storeCandidate[i];
            }
            else if(getSpecficResult(storeCandidate[i]) == min){
                winner = string.concat(winner,storeCandidate[i]);
            }
        }
        return winner;
    }

    modifier VoteOnce{
        if(!VoterExists(msg.sender)){
            voters[msg.sender] = Voter({exist: 1 , hasVoted: false , votedFor: ""});
        }
        else{
            require(voters[msg.sender].hasVoted == false , "You have voted already!");
        }
        _;
    }

    modifier nameExist(string memory candidateName){
        require(CandidateExists(candidateName) == true , "No such candidate exist");
        _;
    }

    function VoterExists(address key) internal view returns (bool) {
        if(voters[key].exist > 0){
            return true;
        }
        return false;
    }

    function CandidateExists(string memory key) internal view returns (bool) {
        if(candidates[key].exist > 0){
            return true;
        }
        return false;
    }






}