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

import Jazzicon from "./Jazzicon";

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
                    <Avatar size="sm" icon={<Jazzicon diameter="32" address={claim[1]} />} />
                  </Box>
                  <Text>{claim[1]}</Text>
                  <Tag colorScheme="whatsapp" fontWeight="600">
                    👍 : {claim[4].toNumber()}
                  </Tag>
                  <Tag colorScheme="whatsapp" fontWeight="600">
                    👎 : {claim[5].toNumber()}
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

            </HStack>
            <Link cursor="pointer" to={`/claim/${claim[0].toNumber()}`}>
              <Heading fontSize="20px" textColor="whatsapp.500">
                {claim[2]}
              </Heading>
            </Link>
            <Text>{claim.claimSummary}</Text>
            <Text fontWeight="600">{claim.startTime}</Text>
          </VStack>
        );
      })}
    </VStack>
  );
  // Harpal incoming
  // =======
  //     return (
  //         <VStack alignItems="flex-start" width="100%" spacing={4}>
  //             {
  //                 claims.map((claim) => {
  //                     return (
  //                         <VStack key={claim._id} alignItems="flex-start"  borderStyle="solid"  borderWidth="1px" borderRadius="10px" borderColor="whatsapp.500" px={6} py={4} width="100%">
  //                             <HStack justifyItems="flex-start" alignItems="flex-start" width="100%">
  //                                 <Box>
  //                                     <HStack>
  //                                         <Box borderStyle="solid" borderWidth="2px" borderRadius="full" borderColor="whatsapp.500" padding="2px">
  //                                             <Avatar icon={<Jazzicon diameter="48" address={claim.author} />}/>
  //                                         </Box>
  //                                         <Text>{claim.author}</Text>
  //                                     </HStack>
  //                                 </Box>
  //                                 <Spacer />
  //                                 <Tag colorScheme="whatsapp" fontWeight="600">Open</Tag>
  //                             </HStack>
  //                             <Link cursor="pointer" to={`/claim/${claim._id}`}>
  //                                 <Heading fontSize="20px" textColor="whatsapp.500">{claim.claimTitle}</Heading>
  //                             </Link>
  //                             <Text>
  //                                 {claim.claimSummary}
  //                             </Text>
  //                             <Text fontWeight="600">{claim.startTime}</Text>
  //                         </VStack>
  //                     );
  //                 })
  //             }

  //         </VStack>
  //     );
  // >>>>>>> d6ee2d96d2d44819f44eac9f99755be528ff1856
}

export default ClaimsList;
