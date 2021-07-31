import { VStack, Text, Heading } from "@chakra-ui/react";
import { useCountUp } from "react-countup";
function Stats() {

    useCountUp({ ref: "count-up-members", end: 47, delay: 0, duration: 2 });
    useCountUp({ ref: "count-up-funds", suffix: " DAI", end: 50.2, decimals: 2, delay: 0, duration: 2 });
    useCountUp({ ref: "count-up-claims", end: 57, delay: 0, duration: 2 });

    return (
        <VStack width="100%">
            <VStack borderColor="whatsapp.500" borderStyle="solid" borderWidth="1px" alignItems="flex-start" px="20px" py="15px" width="100%" boxShadow="base" borderRadius="10px">
                <Text fontWeight="600">Treasury Funds</Text>
                <Heading fontSize="24px" id="count-up-funds" textColor="whatsapp.500">10,234 ETH</Heading>
            </VStack>
            <VStack borderColor="whatsapp.500" borderStyle="solid" borderWidth="1px" alignItems="flex-start" px="20px" py="15px" width="100%" boxShadow="base" borderRadius="10px">
                <Text fontWeight="600">Claims Reimbursed</Text>
                <Heading fontSize="24px" id="count-up-claims" textColor="whatsapp.500">57</Heading>
            </VStack>
            <VStack borderColor="whatsapp.500" borderStyle="solid" borderWidth="1px" alignItems="flex-start" px="20px" py="15px" width="100%" boxShadow="base" borderRadius="10px">
                <Text fontWeight="600">DAO Members</Text>
                <Heading fontSize="24px" id="count-up-members" textColor="whatsapp.500">47</Heading>
            </VStack>
        </VStack>
    );
}

export default Stats;