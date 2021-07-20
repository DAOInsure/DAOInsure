import { 
    VStack, 
    Heading, 
    Tag,
    HStack,
    Box,
    Spacer,
    Avatar,
    Text
} from "@chakra-ui/react";

function ClaimsList() {
    return (
        <VStack alignItems="flex-start" width="100%" spacing={4}>
            <VStack alignItems="flex-start"  borderStyle="solid"  borderWidth="1px" borderRadius="10px" borderColor="whatsapp.500" px={6} py={4} width="100%">
                <HStack justifyItems="flex-start" alignItems="flex-start" width="100%">
                    <Box>
                        <HStack>
                            <Box borderStyle="solid" borderWidth="2px" borderRadius="full" borderColor="whatsapp.500" padding="2px">
                                <Avatar src="https://worker.snapshot.org/mirror?img=https%3A%2F%2Fraw.githubusercontent.com%2Fsnapshot-labs%2Fsnapshot-spaces%2Fmaster%2Fspaces%2Fgitcoindao.eth%2Fspace.png"/>
                            </Box>
                            <Text>0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69</Text>
                        </HStack>
                    </Box>
                    <Spacer />
                    <Tag colorScheme="whatsapp" fontWeight="600">Open</Tag>
                </HStack>
                <Heading fontSize="20px" textColor="whatsapp.500">Impose Governance Standards & Processes</Heading>
                <Text>
                    This proposal seeks to add a $50k DAI “side round” to Gitcoin Grants Round 10 (with funds outside of the current matching pool) in support o...
                </Text>
                <Text fontWeight="600">ended 3 days ago...</Text>
            </VStack>
        </VStack>
    );
}

export default ClaimsList;