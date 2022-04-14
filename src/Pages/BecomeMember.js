import {
	VStack,
	Button,
	Heading,
	UnorderedList,
	ListItem,
	Tag,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalFooter,
	useDisclosure,
	ModalOverlay,
	ModalCloseButton,
	HStack,
	Input,
} from "@chakra-ui/react";
import { Web3Context } from "../utils/Web3Context";
import { useContext } from "react";
import GreenTag from "../Components/GreenTag";
import { ethers } from "ethers";
import Web3 from "web3";

import {
	SUPERAPP_CONTRACT_ADDRESS,
	SUPERAPP_CONTRACT_ABI,
} from "../ContractConfig/superApp";
import { useState } from "react";

const SuperfluidSDK = require("@superfluid-finance/js-sdk");

function BecomeMember() {
	const { signerAddress, provider, signer } = useContext(Web3Context);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();

	const handleChange = (e, setter) => {
		setter(e.target.value);
	};

	const web3 = new Web3(provider);

	console.log(web3);

	const joinDao = async () => {
		let contract = new ethers.Contract(
			SUPERAPP_CONTRACT_ADDRESS,
			SUPERAPP_CONTRACT_ABI,
			signer
		);

		const walletAddress = await window.ethereum.request({
			method: "eth_requestAccounts",
			params: [
				{
					eth_accounts: {},
				},
			],
		});

		// this sdk has a lot of changes (breaking changes) from the version we used.
		const sf = new SuperfluidSDK.Framework({
			ethers: provider,
		});

		await sf.initialize();

		// creating user from unlocked address. token is super token.
		const carol = sf.user({
			address: walletAddress[0],
			token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
		});

		// creating a flow, user data can contain arbitary data.
		await carol.flow({
			recipient: SUPERAPP_CONTRACT_ADDRESS,
			flowRate: "3858024691358",
			userData: web3.eth.abi.encodeParameters(
				["string", "string"],
				[latitude, longitude]
			),
		});

		// details of the user like incoming and outgoing flow rates, and the various active flows along with types.
		const details = await carol.details();
		console.log(details);

		// // Call the host with the batch call parameters
		// await sf.host.batchCall(createPlayBatchCall(100));
		function createPlayBatchCall(upgradeAmount = 0) {
			return [
				[
					202, // upgrade 100 daix to play the game
					"0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
					// adding latitude and longitude to the encoded data.
					contract.interface.encodeFunctionData("setCoordinates", [
						parseInt(latitude),
						parseInt(longitude),
					]),
				],
				[
					1, // approve the ticket fee
					{
						token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f", // Super Tokens only
						amount: "1000000000000000000",
						spender: SUPERAPP_CONTRACT_ADDRESS,
					},
				],
			];
		}

		// Call the host with the batch call parameters
		await sf.host.batchCall(createPlayBatchCall(100));
	};

	return (
		<VStack spacing={5} mt='20px'>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Enter the following Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<HStack>
							<Input
								onChange={(e) => handleChange(e, setLatitude)}
								placeholder='Latitude'
							/>
							<Input
								onChange={(e) => handleChange(e, setLongitude)}
								placeholder='Longitude'
							/>
						</HStack>
					</ModalBody>
					<ModalFooter>
						<Button onClick={joinDao} colorScheme='whatsapp'>
							Join DAO (10 DAIx / Month)
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Heading fontSize='32px'>Become A Member</Heading>
			<Heading fontSize='24px'>How it works?</Heading>
			<UnorderedList>
				<ListItem>
					DAOInsure provides insurances to its members based on DAO
					voting
				</ListItem>
				<ListItem>
					DAO members stream insurance premium to the treasury.
				</ListItem>
				<ListItem>
					In exchange for premium paid the members get voting power.
				</ListItem>
				<ListItem>
					Use voting power to approve other fellow member's claim.
				</ListItem>
			</UnorderedList>
			<Heading fontSize='24px'>
				Become A Member just 10 DAIx / Month
			</Heading>
			{signerAddress ? (
				<Button colorScheme='whatsapp' onClick={onOpen}>
					Join the DAO
				</Button>
			) : (
				<GreenTag>Please connect wallet first</GreenTag>
			)}
		</VStack>
	);
}

export default BecomeMember;
