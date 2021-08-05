import {
  VStack,
  Heading,
  Tag,
  HStack,
  Box,
  Spacer,
  Avatar,
  Text,
} from "@chakra-ui/react";

import { useHistory, Link } from "react-router-dom";

function ClaimsList({ claims }) {
  let history = useHistory();

  return (
    <VStack alignItems="flex-start" width="100%" spacing={4}>
      {claims.map((claim) => {
        return (
          <VStack
            key={claim[0].toNumber()}
            alignItems="flex-start"
            borderStyle="solid"
            borderWidth="1px"
            borderRadius="10px"
            borderColor="whatsapp.500"
            px={6}
            py={4}
            width="100%"
          >
            <HStack
              justifyItems="flex-start"
              alignItems="flex-start"
              width="100%"
            >
              <Box>
                <HStack>
                  <Box
                    borderStyle="solid"
                    borderWidth="2px"
                    borderRadius="full"
                    borderColor="whatsapp.500"
                    padding="2px"
                  >
                    <Avatar src="https://worker.snapshot.org/mirror?img=https%3A%2F%2Fraw.githubusercontent.com%2Fsnapshot-labs%2Fsnapshot-spaces%2Fmaster%2Fspaces%2Fgitcoindao.eth%2Fspace.png" />
                  </Box>
                  <Text>{claim[2]}</Text>
                  <Tag colorScheme="whatsapp" fontWeight="600">
                    Yes : {claim[4].toNumber()}
                  </Tag>
                  <Tag colorScheme="whatsapp" fontWeight="600">
                    No : {claim[5].toNumber()}
                  </Tag>
                </HStack>
              </Box>
              <Spacer />
              {/* <Tag
                colorScheme="whatsapp"
                fontWeight="600"
                // onClick={() => {
                //   history.push({
                //     pathname: "/voting",
                //     state: { proposalId: claim[0].toNumber() },
                //   });
                // }}
              >
                Open
              </Tag> */}

              <Link cursor="pointer" to={`/claim/${claim[0].toNumber()}`}>
                Open
              </Link>
            </HStack>
            <Heading fontSize="20px" textColor="whatsapp.500">
              {claim[1]}
            </Heading>
            <Text>{claim.claimSummary}</Text>
            <Text fontWeight="600">{claim.startTime}</Text>
          </VStack>
        );
      })}
    </VStack>
  );
}

export default ClaimsList;
