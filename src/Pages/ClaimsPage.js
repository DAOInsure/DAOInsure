import { HStack, Grid, Tabs, TabList, Tab, TabPanel, TabPanels, Tag, Button, Box } from "@chakra-ui/react";
import ClaimsList from "../Components/ClaimsList";
import Stats from "../Components/Stats";
import GreenTag from "../Components/GreenTag";
import { Link } from "react-router-dom";

function ClaimsPage() {
    return (
        <Grid height="calc(100vh - 64px)" px="250px" py="20px" width="100%" templateColumns="2fr 1fr" gridGap={5} alignItems="flex-start">

            <Tabs variant="soft-rounded" colorScheme="whatsapp">
                <TabList justifyContent="space-between">
                    <HStack>
                        <Tab>
                            Open Claims <GreenTag>200</GreenTag>
                        </Tab>
                        <Tab variant="solid">
                            Closed Claims <GreenTag>200</GreenTag>
                        </Tab>
                    </HStack>
                    <Link to="/makeClaim">
                        <Button colorScheme="whatsapp">
                            + Make a Claim
                        </Button>
                    </Link>
                </TabList>
                <TabPanels>
                    <TabPanel py={4} px={0}>
                        <ClaimsList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Stats />
        </Grid>
    );
}

export default ClaimsPage;