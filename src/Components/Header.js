import { Heading, HStack, Button, Spacer, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Web3Context } from "../utils/Web3Context";

function Header(props) {
  const web3Context = useContext(Web3Context);
  const {
    connectWallet,
    signerAddress,
    provider,
    signer,
    checkIfMemberExists,
  } = web3Context;

  function connect() {
    connectWallet().then((data) => {
      console.log("header1,", data);
      checkIfMemberExists(data).then((value) => {
        if (value === true) {
          props.setIsMember(true);
        }
      });
    });
  }

  return (
    <HStack
      backgroundColor="white"
      zIndex="1"
      position="fixed"
      width="100vw"
      boxShadow="base"
      px="250px"
      py={3}
    >
      <Link to="/">
        <Image height="35px" src="../assets/DAOInsure.png" />
      </Link>
      <Spacer />
      <Link to="/profile">
        <Button colorScheme="whatsapp">Profile</Button>
      </Link>
      <Link to="/voting">
        <Button colorScheme="whatsapp" variant="solid">
          Voting
        </Button>
      </Link>

      {(signerAddress !== "" && signerAddress !== undefined) ? (
        <Button colorScheme="whatsapp" variant="solid">
          {`${signerAddress.substr(0,6)}...${signerAddress.substr(-6)}`}
        </Button>
      ) : (
        <Button onClick={connect} colorScheme="whatsapp" variant="solid">
          Connect Wallet
        </Button>
      )}
    </HStack>
  );
}

export default Header;
