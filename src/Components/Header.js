import {
	Heading,
	HStack,
	Button,
	Spacer,
	Image,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	ModalContent,
	ModalHeader,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Web3Context } from "../utils/Web3Context";

function Header(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const web3Context = useContext(Web3Context);
	const { connectWallet, signerAddress, checkIfMemberExists } = web3Context;

	function connect() {
		connectWallet().then(async (data) => {
			console.log(data.provider.networkVersion);
			if (data.provider.networkVersion == "80001") {
				checkIfMemberExists(data).then((value) => {
					if (value === true) {
						props.setIsMember(true);
					}
				});
			} else {
				onOpen();
			}
		});
	}

	return (
		<HStack
			backgroundColor='white'
			zIndex='1'
			position='fixed'
			width='100vw'
			boxShadow='base'
			px='250px'
			py={3}>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Invalid Network</ModalHeader>
					<ModalBody>Please connect to Mumbai Testnet.</ModalBody>
				</ModalContent>
			</Modal>
			<Link to='/'>
				<Image height='35px' src='../assets/DAOInsure.png' />
			</Link>
			<Spacer />
			<Link to='/profile'>
				<Button colorScheme='whatsapp'>Profile</Button>
			</Link>
			<Link to='/activity'>
				<Button colorScheme='whatsapp'>Activity</Button>
			</Link>

			{signerAddress !== "" && signerAddress !== undefined ? (
				<Button colorScheme='whatsapp' variant='solid'>
					{`${signerAddress.substr(0, 6)}...${signerAddress.substr(
						-6
					)}`}
				</Button>
			) : (
				<Button
					onClick={connect}
					colorScheme='whatsapp'
					variant='solid'>
					Connect Wallet
				</Button>
			)}
		</HStack>
	);
}

export default Header;
