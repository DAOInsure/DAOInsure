import { VStack, Button, Heading, UnorderedList, ListItem, Tag } from "@chakra-ui/react";
import { Web3Context } from "../utils/Web3Context";
import { useContext } from "react";
import GreenTag from "../Components/GreenTag";

function BecomeMember() {

    const { signerAddress } = useContext(Web3Context);

    return ( 
        <VStack spacing={5} mt="20px">
            <Heading fontSize="32px">
                Become A Member
            </Heading>
            <Heading fontSize="24px">
                How it works?
            </Heading>
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
            <Heading fontSize="24px">
                Become A Member just 10 USDCx / Month
            </Heading>
            {
                signerAddress ?
                <Button colorScheme="whatsapp">
                    Join the DAO
                </Button>
                :
                <GreenTag>
                    Please connect wallet first
                </GreenTag>
            }
        </VStack>
    );
}

export default BecomeMember;