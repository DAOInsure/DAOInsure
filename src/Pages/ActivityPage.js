import { Heading, Grid, Box, HStack, VStack, Thead, Tr, Th, Table, Tbody, Td } from "@chakra-ui/react";

import GreenTag from "../Components/GreenTag";

function ActivityPage() {

    // useCountUp({ ref: "count-up-members", end: 1429, delay: 0, duration: 2 });
    // useCountUp({ ref: "count-up-funds", prefix: "DAI ", end: 50.2, decimals: 2, delay: 0, duration: 2 });
    // useCountUp({ ref: "count-up-votes", end: 50, delay: 0, duration: 2 });
    // useCountUp({ ref: "count-up-claims", end: 5, delay: 0, duration: 2 });


    return (
        <Grid px="250px" gridGap="10px" py="20px">
            <Heading fontSize="24px" color="whatsapp.500">Activity</Heading>
            {/* <Grid color="whatsapp.500" templateColumns="repeat(4, 1fr)" gridGap="10px">
                <VStack alignItems="flex-start" borderWidth="2px" borderColor="whatsapp.500" borderRadius="10px" padding="10px">
                    <Heading fontSize="16px">
                        DAO Members
                    </Heading>
                    <Heading fontSize="48px">
                        <div id="count-up-members" />
                    </Heading>
                </VStack>
                <VStack alignItems="flex-start" borderWidth="2px" borderColor="whatsapp.500" borderRadius="10px" padding="10px">
                    <Heading fontSize="16px">
                        Treasury Funds
                    </Heading>
                    <Heading fontSize="48px">
                        <div id="count-up-funds" />
                    </Heading>
                </VStack>
                <VStack alignItems="flex-start" borderWidth="2px" borderColor="whatsapp.500" borderRadius="10px" padding="10px">
                    <Heading fontSize="16px">
                        Votes
                    </Heading>
                    <Heading fontSize="48px">
                        <div id="count-up-votes" />
                    </Heading>
                </VStack>
                <VStack alignItems="flex-start" borderWidth="2px" borderColor="whatsapp.500" borderRadius="10px" padding="10px">
                    <Heading fontSize="16px">
                        Claims
                    </Heading>
                    <Heading fontSize="48px">
                        <div id="count-up-claims" />
                    </Heading>
                </VStack>                
            </Grid> */}
            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            Claim Title
                        </Th>
                        <Th>
                            Address
                        </Th>
                        <Th>
                            Vote
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            First Claim
                        </Td>
                        <Td>
                            <GreenTag>
                                0xaksdnakrn3io2oiwjcanio
                            </GreenTag>
                        </Td>
                        <Td>
                            Yes
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Grid>
    );
}

export default ActivityPage;