export const DAO_CONTRACT_ADDRESS =
  "0xA14df1916649b3fB3c29A01229C5046887E54C2B";

export const DAO_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "address",
      },
    ],
    name: "userVoteForProposal",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256",
      },
      {
        name: "_vote",
        type: "bool",
      },
    ],
    name: "voteOnProposal",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "returnProposalById",
    outputs: [
      {
        components: [
          {
            name: "proposalId",
            type: "uint256",
          },
          {
            name: "userAddress",
            type: "address",
          },
          {
            name: "proposalString",
            type: "string",
          },
          {
            name: "claimAmount",
            type: "uint256",
          },
          {
            name: "yesVotes",
            type: "uint256",
          },
          {
            name: "noVotes",
            type: "uint256",
          },
          {
            name: "voting",
            type: "bool",
          },
          {
            name: "passed",
            type: "bool",
          },
          {
            name: "endTime",
            type: "uint256",
          },
          {
            name: "ipfsHash",
            type: "string",
          },
          {
            name: "dateOfIncident",
            type: "string",
          },
          {
            name: "rainData",
            type: "uint256",
          },
        ],
        name: "",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "settleOutcome",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "daoInsureTokenAddress",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalString",
        type: "string",
      },
      {
        name: "_dt",
        type: "string",
      },
      {
        name: "_ipfsHash",
        type: "string",
      },
    ],
    name: "createProposal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_memberAddress",
        type: "address",
      },
    ],
    name: "removeDaoMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "proposalsMapping",
    outputs: [
      {
        name: "proposalId",
        type: "uint256",
      },
      {
        name: "userAddress",
        type: "address",
      },
      {
        name: "proposalString",
        type: "string",
      },
      {
        name: "claimAmount",
        type: "uint256",
      },
      {
        name: "yesVotes",
        type: "uint256",
      },
      {
        name: "noVotes",
        type: "uint256",
      },
      {
        name: "voting",
        type: "bool",
      },
      {
        name: "passed",
        type: "bool",
      },
      {
        name: "endTime",
        type: "uint256",
      },
      {
        name: "ipfsHash",
        type: "string",
      },
      {
        name: "dateOfIncident",
        type: "string",
      },
      {
        name: "rainData",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "superAppContractAddress",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256",
      },
      {
        name: "_rain",
        type: "uint256",
      },
    ],
    name: "setRain",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "arr",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "userVotedFor",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_tokenAddress",
        type: "address",
      },
      {
        name: "_superApp",
        type: "address",
      },
    ],
    name: "setAddresses",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "proposalIdNumber",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    name: "daoMemberMapping",
    outputs: [
      {
        name: "memberAddress",
        type: "address",
      },
      {
        name: "lat",
        type: "string",
      },
      {
        name: "long",
        type: "string",
      },
      {
        name: "votes",
        type: "uint256",
      },
      {
        name: "proposals",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "claimProposal",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_memberAddress",
        type: "address",
      },
      {
        name: "_lat",
        type: "string",
      },
      {
        name: "_long",
        type: "string",
      },
    ],
    name: "addDaoMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_contract",
        type: "address",
      },
      {
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "countVotes",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "daoMemberCount",
    outputs: [
      {
        name: "",
        type: "int256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_add",
        type: "address",
      },
    ],
    name: "returnUserClaims",
    outputs: [
      {
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_adr",
        type: "address",
      },
    ],
    name: "isUserADaoMember",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "endProposalVoting",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_member",
        type: "address",
      },
    ],
    name: "getClaimAmount",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "votesOfProposal",
    outputs: [
      {
        name: "user",
        type: "address",
      },
      {
        name: "votes",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_add",
        type: "address",
      },
    ],
    name: "returnUserVotes",
    outputs: [
      {
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_add",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
];
