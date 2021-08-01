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
import { Link } from "react-router-dom";
import Jazzicon from "./Jazzicon";

function ClaimsList({ claims }) {
    return (
        <VStack alignItems="flex-start" width="100%" spacing={4}>
            {
                claims.map((claim) => {
                    return (
                        <VStack key={claim._id} alignItems="flex-start"  borderStyle="solid"  borderWidth="1px" borderRadius="10px" borderColor="whatsapp.500" px={6} py={4} width="100%">
                            <HStack justifyItems="flex-start" alignItems="flex-start" width="100%">
                                <Box>
                                    <HStack>
                                        <Box borderStyle="solid" borderWidth="2px" borderRadius="full" borderColor="whatsapp.500" padding="2px">
                                            <Avatar icon={<Jazzicon diameter="48" address={claim.author} />}/>
                                        </Box>
                                        <Text>{claim.author}</Text>
                                    </HStack>
                                </Box>
                                <Spacer />
                                <Tag colorScheme="whatsapp" fontWeight="600">Open</Tag>
                            </HStack>
                            <Link cursor="pointer" to={`/claim/${claim._id}`}>
                                <Heading fontSize="20px" textColor="whatsapp.500">{claim.claimTitle}</Heading>
                            </Link>
                            <Text>
                                {claim.claimSummary}
                            </Text>
                            <Text fontWeight="600">{claim.startTime}</Text>
                        </VStack>
                    ); 
                })
            }
            
        </VStack>
    );
}

export default ClaimsList;