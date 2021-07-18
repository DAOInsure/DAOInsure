import { VStack, Box, Heading } from "@chakra-ui/react";

function Card({ cardTitle, backgroundColor, children }) {
    return (
        <VStack borderRadius="10px" borderStyle="solid" borderColor="whatsapp.500" borderWidth="1px" width="100%" alignItems="flex-start">
            <Box backgroundColor={backgroundColor} width="100%" borderBottomWidth="1px" borderColor="whatsapp.500" px="20px" py="20px">
                <Heading fontSize="16px">
                    {cardTitle}
                </Heading>
            </Box>
            <VStack alignItems="flex-start" px="20px" py="20px" width="100%">
                {children}
            </VStack>
        </VStack>
    );
}

export default Card;