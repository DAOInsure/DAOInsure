import {
  VStack,
  Button,
  Heading,
  UnorderedList,
  ListItem,
  Tag,
} from "@chakra-ui/react";
import { Web3Context } from "../utils/Web3Context";
import { useContext } from "react";
import GreenTag from "../Components/GreenTag";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../ContractConfig/superApp";

const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

function BecomeMember() {
  const { signerAddress, infuraRPC, provider, signer } =
    useContext(Web3Context);

  const joinDao = async () => {
    let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log(contract);

    const sf = new SuperfluidSDK.Framework({
      ethers: provider,
    });

    await sf.initialize();

    const walletAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    await sf.host.batchCall([
      202, // callAppAction to participate
      CONTRACT_ADDRESS,
      contract.setCoordinates(-9, -9),
    ]);

    // const user = sf.user({
    //   address: walletAddress[0],
    //   token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    // });
    // await user.flow({
    //   recipient: "0x077A5ED230633EEAC0B0303Cf9B6C9074E99AB94",
    //   flowRate: "3858024691358", // 10 DAIx per month
    // });
    // const details = await user.details();
    // console.log(details);
  };

  return (
    <VStack spacing={5} mt="20px">
      <Heading fontSize="32px">Become A Member</Heading>
      <Heading fontSize="24px">How it works?</Heading>
      <UnorderedList>
        <ListItem>
          DAOInsure provides insurances to its members based on DAO voting
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
      <Heading fontSize="24px">Become A Member just 10 DAIx / Month</Heading>
      {signerAddress ? (
        <Button colorScheme="whatsapp" onClick={joinDao}>
          Join the DAO
        </Button>
      ) : (
        <GreenTag>Please connect wallet first</GreenTag>
      )}
    </VStack>
  );
}

export default BecomeMember;
