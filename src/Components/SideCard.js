import { VStack, Avatar, Text, Box } from "@chakra-ui/react";

function SideCard() {
    return (
        <VStack width="15vw" borderRadius={5} borderWidth="2px" borderStyle="solid" borderColor="whatsapp.200">
            <VStack padding={5} borderBottomColor="whatsapp.200" borderBottomWidth="2px" width="100%">
                <Avatar size="lg" src="https://worker.snapshot.org/mirror?img=https%3A%2F%2Fcloudflare-ipfs.com%2Fipfs%2FQmT1Ban8im8JQm2gqYSoMGaLZTgxR8nFyrYBF7MgWvRKFh" />
                <Text fontWeight="700" fontSize="20px">Sushi</Text>
            </VStack>
            <VStack alignItems="flex-start" width="100%">
                <Box width="100%" px={5} py={2} borderRadius="2px" borderLeftWidth={false ? "4px": "0px"} borderLeftStyle="solid" borderLeftColor="whatsapp.500">
                    <Text fontWeight="600">Claims</Text>
                </Box>
                <Box py={2} width="100%" _hover={{ bg: "whatsapp.300" }} px={5}>
                    <Text fontWeight="600">New Claim</Text>
                </Box>
            </VStack>
        </VStack>
    );
}

export default SideCard;