import { VStack, Box, Heading, Skeleton } from "@chakra-ui/react";
import ChainlinkLogo from "../chainlinkblue.svg";

function Card({ cardTitle, backgroundColor, children, isLoading }) {
  return (
    <VStack
      borderRadius="10px"
      borderStyle="solid"
      borderColor="blue"
      borderWidth="1px"
      width="100%"
      alignItems="flex-start"
    >
      <Box
        backgroundColor={backgroundColor}
        width="100%"
        borderBottomWidth="1px"
        borderColor="blue"
        px="15px"
        py="15px"
      >
        <Skeleton isLoaded={!isLoading}>
          <Heading fontSize="16px">
            {" "}
            <img src={ChainlinkLogo} width="90px" />
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
