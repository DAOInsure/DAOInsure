import React from "react";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

import {
	DAO_CONTRACT_ABI,
	DAO_CONTRACT_ADDRESS,
} from "../ContractConfig/daoContract";

import {
	SUPERTOKEN_CONTRACT_ADDRESS,
	SUPERTOKEN_CONTRACT_ABI,
} from "../ContractConfig/superToken";

export const Web3Context = React.createContext(undefined);

export function Web3ContextProvider({ children }) {
	const [web3Modal, setWeb3Modal] = useState(undefined);
	const [provider, setProvider] = useState(undefined);
	const [signerAddress, setSignerAddress] = useState(undefined);
	const [isPortisLoading, setIsPortisLoading] = useState(false);
	const [infuraRPC, setInfuraRPC] = useState(undefined);
	const [signer, setSigner] = useState(undefined);
	const [proposalsArray, setProposalsArray] = useState([]);
	const [votedProposalsArray, setVotedProposalsArray] = useState([]);
	const [allProposalsArray, setAllProposalsArray] = useState([]);
	const [openProposalsArray, setOpenProposalsArray] = useState([]);
	const [acceptedProposalsArray, setAcceptedProposalsArray] = useState([]);
	const [rejectedProposalsArray, setRejectedProposalsArray] = useState([]);
	const [daoMemberCount, setDaoMemberCount] = useState(0);
	const [correctNetwork, setCorrectNetwork] = useState();
	const [claimableAmount, setClaimableAmount] = useState(0);
	const [memberData, setMemberData] = useState();

	// app only available on polygon testnet.
	const getAddress = async () => {
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		setSignerAddress(ethers.utils.getAddress(address));
		const tp = new ethers.providers.JsonRpcProvider(
			"https://polygon-mumbai.infura.io/v3/a466d43409994804b44149a1283d131f"
		);
		setInfuraRPC(tp);
		setSigner(signer);

		provider.on("chainChanged", (chainId) => {
			console.log(chainId);
		});
	};

	useEffect(() => {
		if (provider) {
			getAddress();
		} else {
			setSignerAddress("");
		}
	}, [provider]);

	useEffect(() => {
		const providerOptions = {
			portis: {
				display: {
					name: "Portis",
					description: "Connect with Email and Password",
				},
				package: Portis,
				options: {
					id: "e6e65744-ec7a-4360-a174-d88df93094cc",
					nodeUrl:
						"https://polygon-mumbai.g.alchemy.com/v2/nRkhfCmbOhkclY2_zRsEGCRFRLY7W2e3",
					chainId: 80001,
					network: "maticMumbai",
				},
			},
		};

		let w3m = new Web3Modal({
			providerOptions,
			network: "maticMumbai", // optional
		});

		setWeb3Modal(w3m);
	}, []);

	async function connectWallet(choice = "") {
		try {
			if (choice == "portis") {
				setIsPortisLoading(true);
			}

			let modalProvider;
			if (choice !== "") {
				modalProvider = await web3Modal.connectTo(choice);
			} else {
				modalProvider = await web3Modal.connect();
			}

			if (modalProvider.chainId == "0x13881") {
				setCorrectNetwork(true);
			} else {
				setCorrectNetwork(false);
			}

			if (modalProvider.on) {
				modalProvider.on("accountsChanged", (event, callback) => {
					window.location.reload();
				});

				modalProvider.on("chainChanged", (chainId) => {
					window.location.reload();
				});
			}

			const ethersProvider = new ethers.providers.Web3Provider(
				modalProvider
			);
			console.log(ethersProvider.getSigner());
			setProvider(ethersProvider);
			setIsPortisLoading(false);
			return ethersProvider;
		} catch (e) {
			disconnectWallet();
			setIsPortisLoading(false);

			console.log(e);
		}
	}

	function disconnectWallet() {
		web3Modal?.clearCachedProvider();
		setProvider(undefined);
	}

	const fetchProposals = () => {
		if (proposalsArray.length == 0) {
			let contract = new ethers.Contract(
				DAO_CONTRACT_ADDRESS,
				DAO_CONTRACT_ABI,
				signer
			);

			contract.returnUserClaims(`${signerAddress}`).then((data) => {
				const claimIDs = data;
				claimIDs.forEach(async (element) => {
					console.log(element.toNumber());
					let item = await contract.proposalsMapping(
						element.toNumber()
					);
					console.log(item);
					setProposalsArray((oldArray) => [...oldArray, item]);
				});
			});
		}
	};

	const fetchVotedProposals = () => {
		if (votedProposalsArray.length == 0) {
			let contract = new ethers.Contract(
				DAO_CONTRACT_ADDRESS,
				DAO_CONTRACT_ABI,
				signer
			);

			contract.returnUserVotes(`${signerAddress}`).then((data) => {
				const claimIDs = data;
				claimIDs.forEach(async (element) => {
					console.log(element.toNumber());
					let item = await contract.proposalsMapping(
						element.toNumber()
					);
					console.log(item);
					setVotedProposalsArray((oldArray) => [...oldArray, item]);
				});
			});
		}
	};

	const fetchAllProposals = async () => {
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			signer
		);

		let proposalCount = await contract.proposalIdNumber();

		if (allProposalsArray.length != proposalCount.toNumber()) {
			setAllProposalsArray([]);
			let proposalsNum = await contract.proposalIdNumber();
			sortProposals(contract, proposalsNum.toNumber());
			getDaoMemberCount();
		}
	};

	const sortProposals = async (contract, number) => {
		for (let i = 0; i < number; i++) {
			let proposal = await contract.proposalsMapping(i);
			// console.log(proposal);
			setAllProposalsArray((oldArray) => [...oldArray, proposal]);

			// checking if proposal is active or not.
			switch (proposal[6]) {
				// if true push to open proposals array.
				case true:
					setOpenProposalsArray((oldArray) => [
						...oldArray,
						proposal,
					]);
					break;

				// else check if proposal was accepted or rejected.
				case false:
					if (proposal[7] === true) {
						setAcceptedProposalsArray((oldArray) => [
							...oldArray,
							proposal,
						]);
					} else if (proposal[7] === false) {
						setRejectedProposalsArray((oldArray) => [
							...oldArray,
							proposal,
						]);
					}
					break;
			}
		}
	};

	const getDaoMemberCount = async () => {
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			provider
		);

		let count = await contract.daoMemberCount();

		setDaoMemberCount(count.toNumber());
	};

	const checkIfMemberExists = async (provider) => {
		const signer = provider.getSigner();
		const address = await signer.getAddress();

		const signerAdd = ethers.utils.getAddress(address);

		// console.log(provider);
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			provider
		);
		let status = await contract.isUserADaoMember(`${signerAdd}`);
		console.log(status);

		return status;
	};

	const userDaoTokenBalance = async () => {
		let contract = new ethers.Contract(
			SUPERTOKEN_CONTRACT_ADDRESS,
			SUPERTOKEN_CONTRACT_ABI,
			provider
		);
		let balance = await contract.balanceOf(`${signerAddress}`);
		let decimalBalance = ethers.utils.formatEther(balance);
		console.log(decimalBalance);
		return decimalBalance;
	};

	const createProposal = async (title, time, hash) => {
		console.log(title, hash);
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			signer
		);

		let proposal = await contract.createProposal(title, time, hash);
		const receipt = await proposal.wait();
	};

	const getClaimableAmount = async () => {
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			signer
		);

		let claim = await contract.getClaimAmount(signerAddress);
		setClaimableAmount(ethers.utils.formatEther(claim));
	};

	const voteOnProposal = async (proposalId, vote) => {
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			signer
		);

		let proposalVote = await contract.voteOnProposal(proposalId, vote);
		const receipt = await proposalVote.wait();
		console.log(receipt);
	};

	const claimProposal = async (id) => {
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			signer
		);

		let claim = await contract.claimProposal(id);
		try {
			const receipt = await claim.wait();
			alert("Your claim is fulfilled! Check your wallet");
		} catch (error) {
			alert(error.data.message);
		}
	};

	const fetchMemberInfo = async () => {
		let contract = new ethers.Contract(
			DAO_CONTRACT_ADDRESS,
			DAO_CONTRACT_ABI,
			signer
		);

		let member = await contract.daoMemberMapping(signerAddress);
		console.log(member);
		setMemberData(member);
	};

	return (
		<Web3Context.Provider
			value={{
				connectWallet,
				disconnectWallet,
				provider,
				web3Modal,
				isPortisLoading,
				signerAddress,
				infuraRPC,
				checkIfMemberExists,
				fetchProposals,
				userDaoTokenBalance,
				proposalsArray,
				fetchVotedProposals,
				fetchAllProposals,
				allProposalsArray,
				acceptedProposalsArray,
				rejectedProposalsArray,
				openProposalsArray,
				votedProposalsArray,
				daoMemberCount,
				correctNetwork,
				createProposal,
				getClaimableAmount,
				claimableAmount,
				voteOnProposal,
				claimProposal,
				fetchMemberInfo,
				memberData,
			}}>
			{children}
		</Web3Context.Provider>
	);
}
