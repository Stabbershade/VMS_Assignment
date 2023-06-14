// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//A voting management system that enables users to vote for their favorite candidate in an election.
//The smart contract would handle vote casting, tallying, and result reporting.

contract Voting {

    struct Candidate {
        uint8 exist;
        string name;
        uint256 voteCount;
    }

    address public immutable owner;
    mapping(address => bool) public hasVoted;
    mapping(string => Candidate) private candidates;
    string[] private candidateStore;

    event VoteCasted(string indexed candidate);

    constructor(string[] memory _candidiate) {
        owner = msg.sender;
        for (uint256 i = 0; i < _candidiate.length; i++) {
            candidates[_candidiate[i]] = Candidate({
                exist: 1,
                name: _candidiate[i],
                voteCount: 0
            });
            candidateStore = _candidiate;
        }
    }

    function Vote(string memory candidateName) public VoteOnce nameExist(candidateName){
        candidates[candidateName].voteCount += 1;
        hasVoted[msg.sender] = true;
        emit VoteCasted(candidateName);
    }

    function getCandidate(string memory candidateName) public view nameExist(candidateName) returns (uint256) {
        return candidates[candidateName].voteCount;
    }

    function getResult() public view returns (string[] memory) {
        uint256 min = 0;
        string[] memory winner = new string[](candidateStore.length);
        uint counter = 0;
        for (uint256 i = 0; i < candidateStore.length; i++) {
            if (getCandidate(candidateStore[i]) > min) {
                min = getCandidate(candidateStore[i]);
                winner = new string[](candidateStore.length);
                counter = 0;
                winner[counter] = candidateStore[i];
                counter++;
            } else if (getCandidate(candidateStore[i]) == min) {
                winner[counter++] = candidateStore[i];
            }
        }
        return winner;
    }

    modifier VoteOnce() {
        require(!hasVoted[msg.sender], "You have already voted.");
        _;
    }

    modifier nameExist(string memory candidateName) {
        require(CandidateExists(candidateName) == true,"No such candidate exist");
        _;
    }

    function CandidateExists(string memory key) internal view returns (bool) {
        if (candidates[key].exist > 0) {
            return true;
        }
        return false;
    }
}
