import { VStack, Box, Heading, Skeleton } from "@chakra-ui/react";

function Card({ cardTitle, backgroundColor, children, isLoading }) {
    return (
        <VStack borderRadius="10px" borderStyle="solid" borderColor="whatsapp.500" borderWidth="1px" width="100%" alignItems="flex-start">
            <Box backgroundColor={backgroundColor} width="100%" borderBottomWidth="1px" borderColor="whatsapp.500" px="20px" py="20px">
                <Skeleton isLoaded={!isLoading}>
                    <Heading fontSize="16px">
                        {cardTitle}
                    </Heading>
                </Skeleton>
                
            </Box>
            <VStack alignItems="flex-start" px="20px" py="20px" width="100%">
                {children}
            </VStack>
        </VStack>
    );
}

export default Card;