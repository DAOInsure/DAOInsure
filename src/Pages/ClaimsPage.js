import { HStack, Grid, Tabs, TabList, Tab, TabPanel, TabPanels, Tag, Button, Box, Spinner, extendTheme } from "@chakra-ui/react";
import ClaimsList from "../Components/ClaimsList";
import Stats from "../Components/Stats";
import GreenTag from "../Components/GreenTag";
import { Link } from "react-router-dom";
import { AppContext }  from "../utils/AppContext";
import { queryThread } from "../utils/textile";
import { useState, useEffect, useContext } from "react";

function ClaimsPage() {
    
    const { textileClient } = useContext(AppContext);
    const [ openClaims, setOpenClaims ] = useState();
    const [ isLoadingOpenClaims, setIsLoadingOpenClaims ] = useState(true);

    

    useEffect(() => {
        async function init() {
            console.log(textileClient);
            if(textileClient) {
                let openClaims = await queryThread(textileClient, "bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q", "claimsData", {});
                console.log(openClaims);
                setOpenClaims(openClaims);
                setIsLoadingOpenClaims(false);
            }
        }
        init();
    }, [textileClient]);

    return (
        <Grid height="calc(100vh - 64px)" px="250px" py="20px" width="100%" templateColumns="3fr 1fr" gridGap={5} alignItems="flex-start">

            <Tabs variant="soft-rounded" colorScheme="whatsapp">
                <TabList justifyContent="space-between">
                    <HStack>
                        <Tab>
                            Open Claims 
                            {
                                openClaims == undefined ?
                                <GreenTag>0</GreenTag>
                                :
                                <GreenTag>{openClaims.length}</GreenTag>
                            }
                        </Tab>
                        <Tab variant="solid">
                            Accepted Claims <GreenTag>4</GreenTag>
                        </Tab>
                        <Tab variant="solid">
                            Rejected Claims <GreenTag>1</GreenTag>
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
                        {
                            isLoadingOpenClaims ? 
                            <Spinner />
                            :
                            <ClaimsList claims={openClaims} />
                        }
                    </TabPanel>
                    <TabPanel py={4} px={0}>
                        {/* <ClaimsList /> */}
                    </TabPanel>
                    <TabPanel py={4} px={0}>
                        {/* <ClaimsList /> */}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Stats />
        </Grid>
    );
}

export default ClaimsPage;