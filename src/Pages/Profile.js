import { Heading, VStack, Box, Spacer, HStack, Avatar, Tabs, Tab, TabPanel, TabList, Tag, Grid, Table, Tr, Thead, Th, TabPanels, Tbody, Text } from "@chakra-ui/react";
import InformationCards from "../Components/InformationCards";
import Jazzicon from "../Components/Jazzicon";
import Card from "../Components/Card";

function Profile() {
    return (
        <VStack alignItems="flex-start" height="calc(100vh - 64px)" px="250px" py="20px" width="100%">
            <HStack width="100%" alignItems="flex-start" alignItems="center">
                <Box borderWidth="2px" borderRadius="full" borderColor="whatsapp.500" padding="2px">
                    <Avatar size="md" icon={<Jazzicon diameter="48" address="0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69" />} />
                </Box>
                <VStack alignItems="flex-start">
                    <Heading fontSize="20px">0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69</Heading>
                    <Tag>350 DIx</Tag>
                </VStack>
                <Spacer />
                <VStack>
                    <Tag>Paid: 350 USDCx</Tag>
                </VStack>
            </HStack>
            <Grid width="100%" mt="30px !important" templateColumns="3fr 2fr" gridGap={5} alignItems="flex-start">
                <Tabs colorScheme="whatsapp" variant="soft-rounded" width="100%">
                    <TabList>
                        <Tab>Open Claims <Tag ml={2} borderRadius="20px">5</Tag></Tab>
                        <Tab>Closed Claims</Tab>
                        <Tab>Voted For</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel mt={3} padding={0}>
                            <Card cardTitle="Claims">
                                <Table>
                                    <Tbody>
                                        <Tr>
                                            <Th>Address</Th>
                                            <Th>Choice</Th>
                                        </Tr>
                                        <Tr>
                                            <Th>Address</Th>
                                            <Th>Choice</Th>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Card>
                            
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <InformationCards />
            </Grid>
            
        </VStack>
    );
}

export default Profile;
