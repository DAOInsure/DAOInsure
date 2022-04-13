pragma experimental ABIEncoderV2;
pragma solidity ^0.5.0;

interface IVoteCount {
    function balanceOf(address _userAddress) external view returns (uint256);
}

interface ISendClaimAmount {
    function withdrawAmount(address _recipient, uint256 _amount) external;
}

contract Governance {
    // 🚨 Address of ISuperToken needs to be initialised after contract deployment
    address public daoInsureTokenAddress;
    address public superAppContractAddress;

    uint256 public proposalIdNumber;

    uint256[] public arr;

    struct Proposal {
        uint256 proposalId;
        address userAddress;
        string proposalString;
        uint256 claimAmount;
        uint256 yesVotes;
        uint256 noVotes;
        bool voting;
        bool passed;
        uint256 endTime;
    }

    struct Member {
        address memberAddress;
        int256 lat;
        int256 long;
        uint256 votes;
        uint256 proposals;
    }

    constructor() public {
        proposalIdNumber = 0;
    }

    modifier daoMember() {
        require(
            countVotes(daoInsureTokenAddress, msg.sender) > 0,
            "You are not a DAO member"
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == 0xbbbaaD77908e7143B6b4D5922fd201cd08568f63,
            "You are not an admin"
        );
        _;
    }

    mapping(uint256 => Proposal) public proposalsMapping;

    // 🚨 Need to check if this is needed
    mapping(uint256 => mapping(address => bool)) public userVoteForProposal;

    mapping(address => Member) public daoMemberMapping;

    function countVotes(address _contract, address _userAddress)
        public
        view
        returns (uint256)
    {
        return (IVoteCount(_contract).balanceOf(_userAddress));
    }

    function createProposal(string memory _proposalString) public daoMember {
        proposalsMapping[proposalIdNumber] = Proposal({
            proposalId: proposalIdNumber,
            userAddress: msg.sender,
            claimAmount: (countVotes(daoInsureTokenAddress, msg.sender)),
            proposalString: _proposalString,
            yesVotes: 0,
            noVotes: 0,
            voting: true,
            passed: false,
            endTime: (now + 3 minutes)
        });

        proposalIdNumber += 1;
    }

    function returnProposalById(uint256 _proposalId)
        public
        view
        returns (Proposal memory)
    {
        return (proposalsMapping[_proposalId]);
    }

    // Also need to check if Proposal exists
    function voteOnProposal(uint256 _proposalId, bool _vote)
        public
        daoMember
        returns (uint256, uint256)
    {
        require(
            proposalsMapping[_proposalId].voting == true,
            "Voting has ended"
        );

        require(
            !userVoteForProposal[_proposalId][msg.sender],
            "User has already voted"
        );

        userVoteForProposal[_proposalId][msg.sender] = true;

        if (now >= proposalsMapping[_proposalId].endTime) {
            endProposalVoting(_proposalId);
        } else if (now <= proposalsMapping[_proposalId].endTime) {
            if (_vote == false) {
                proposalsMapping[_proposalId].noVotes += 1;
                return (
                    proposalsMapping[_proposalId].yesVotes,
                    proposalsMapping[_proposalId].noVotes
                );
            } else if (_vote == true) {
                proposalsMapping[_proposalId].yesVotes += 1;
                return (
                    proposalsMapping[_proposalId].yesVotes,
                    proposalsMapping[_proposalId].noVotes
                );
            }
        }
    }

    // 🚨 Restriction needs to be added here
    function endProposalVoting(uint256 _proposalId) public {
        // Add a require here only for Chainlink Keeper
        proposalsMapping[_proposalId].voting = false;
        settleOutcome(_proposalId);
    }

    function setAddresses(address _tokenAddress, address _superApp)
        public
        onlyAdmin
    {
        daoInsureTokenAddress = _tokenAddress;
        superAppContractAddress = _superApp;
    }

    // 🚨 Need to add modifier to restrict access + add a return + consider any other require
    function addDaoMember(
        address _memberAddress,
        int256 _lat,
        int256 _long
    ) public {
        daoMemberMapping[_memberAddress] = Member({
            memberAddress: _memberAddress,
            lat: _lat,
            long: _long,
            votes: 0,
            proposals: 0
        });
    }

    // 🚨 Need to add modifier to restrict access + add a return + consider any other require
    function removeDaoMember(address _memberAddress) public {
        delete daoMemberMapping[_memberAddress];
    }

    function settleOutcome(uint256 _proposalId) public {
        if (
            proposalsMapping[_proposalId].yesVotes >
            proposalsMapping[_proposalId].noVotes
        ) {
            proposalsMapping[_proposalId].passed = true;
            ISendClaimAmount(superAppContractAddress).withdrawAmount(
                proposalsMapping[_proposalId].userAddress,
                proposalsMapping[_proposalId].claimAmount
            );
        } else if (
            proposalsMapping[_proposalId].yesVotes <=
            proposalsMapping[_proposalId].noVotes
        ) {
            proposalsMapping[_proposalId].passed = false;
        }
    }

    // 🚨 need to limit who can call this function
    function claimProposal(uint256 _proposalId) public {
        require(
            now >= proposalsMapping[_proposalId].endTime,
            "Voting is still active"
        );
        endProposalVoting(_proposalId);
    }
}
