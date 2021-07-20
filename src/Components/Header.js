import { 
    Heading,
    HStack,
    Button,
    Spacer 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react"; 
import { Web3Context } from "../utils/Web3Context";

function Header() {

    const web3Context = useContext(Web3Context);
    const { connectWallet, signerAddress }  = web3Context;

    return (
        <HStack zIndex="1000" position="fixed" width="100vw" backgroundColor="whatsapp.500" boxShadow="base" px="250px" py={3}>
            <Link to="/">
                <Heading color="white" fontSize="24px">DAOInsure</Heading>
            </Link>
            <Spacer />
            <Link to="/profile">
                <Button colorScheme="whiteAlpha">
                    Profile
                </Button>
            </Link>
            <Link to="/voting">
                <Button colorScheme="whiteAlpha" variant="solid">
                    Voting
                </Button>
            </Link>
            {
                signerAddress !== "" ?
                <Button colorScheme="whiteAlpha" variant="solid">
                    {signerAddress}
                </Button>
                :
                <Button onClick={() => {connectWallet()}} colorScheme="whiteAlpha" variant="solid">
                    Connect Wallet
                </Button>
            }
        </HStack>
    );
}

export default Header;