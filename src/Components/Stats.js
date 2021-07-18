import { VStack, Text, Heading } from "@chakra-ui/react";

function Stats() {
    return (
        <VStack width="100%">
            <VStack borderColor="whatsapp.500" borderStyle="solid" borderWidth="1px" alignItems="flex-start" px="20px" py="15px" width="100%" boxShadow="base" borderRadius="10px">
                <Text fontWeight="600">Treasury Funds</Text>
                <Heading fontSize="24px" textColor="whatsapp.500">10,234 ETH</Heading>
            </VStack>
            <VStack borderColor="whatsapp.500" borderStyle="solid" borderWidth="1px" alignItems="flex-start" px="20px" py="15px" width="100%" boxShadow="base" borderRadius="10px">
                <Text fontWeight="600">Claims Reimbursed</Text>
                <Heading fontSize="24px" textColor="whatsapp.500">57</Heading>
            </VStack>
        </VStack>
    );
}

export default Stats;