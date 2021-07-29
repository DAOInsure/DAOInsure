import { VStack, Text, Spacer, HStack, Progress, Image, Avatar, Tag } from "@chakra-ui/react";
import Card from "./Card";
import { FaExternalLinkAlt } from "react-icons/fa";
import Jazzicon from "./Jazzicon";

function InformationCards() {

    const voters = [""];

    return ( 
        <VStack spacing={5}>
            <Card cardTitle="Information">
                <HStack width="100%">
                    <Text fontWeight="600">Author</Text>
                    <Spacer />
                    <Text>0x234j23n2kj34</Text>
                </HStack>
                <HStack width="100%">
                    <Text fontWeight="600">IPFS</Text>
                    <Spacer />
                    <HStack><Text>0x234j23n2kj34</Text><FaExternalLinkAlt size="10px" /></HStack>
                </HStack>
                <HStack width="100%">
                    <Text fontWeight="600">Start Date</Text>
                    <Spacer />
                    <Text>{new Date(Date.now()).toDateString()}</Text>
                </HStack>
                <HStack width="100%">
                    <Text fontWeight="600">End Date</Text>
                    <Spacer />
                    <Text>{new Date(Date.now()).toDateString()}</Text>
                </HStack>
                <HStack width="100%">
                    <Text fontWeight="600">Block</Text>
                    <Spacer />
                    <Text>12,813,483</Text>
                </HStack>
            </Card>
            <Card cardTitle="OpenWeather">
                <VStack width="100%">
                    <HStack width="100%">
                        <Text fontWeight="600">
                            Timezone
                        </Text>
                        <Spacer />
                        <Text>
                            Asia/Kolkata
                        </Text>
                    </HStack>
                    <HStack width="100%">
                        <Text fontWeight="600">
                            Date Of Incident
                        </Text>
                        <Spacer />
                        <HStack>
                            <Text>{new Date(1626073200 * 1000).toDateString()}</Text>
                        </HStack>
                    </HStack>
                    <HStack width="100%">
                        <Text fontWeight="600">
                            Description
                        </Text>
                        <Spacer />
                        <HStack>
                            <Text>Scattered Clouds</Text>
                        </HStack>
                    </HStack>
                </VStack>
            </Card>
            <Card cardTitle="Current Results">
                <VStack width="100%">
                    <HStack width="100%">
                        <Text fontWeight="600">
                            Yes
                        </Text>
                        <Spacer />
                        <Text fontWeight="600">
                            95%
                        </Text>
                    </HStack>
                    <Progress width="100%" borderRadius="20px" background="gray.300" height="10px" value={95} colorScheme="green" size="lg" />
                    <HStack width="100%">
                        <Text fontWeight="600">
                            No
                        </Text>
                        <Spacer />
                        <Text fontWeight="600">
                            5%
                        </Text>
                    </HStack>
                    <Progress width="100%" borderRadius="20px" background="gray.300" height="10px" value={5} colorScheme="green" size="lg" />
                </VStack>
            </Card>
            <Card cardTitle="Votes">
                <VStack width="100%" alignItems="flex-start">
                    {
                        voters.map((voter) => {
                            return (
                                <HStack justifyContent="space-between" width="100%" key={0}> 
                                    <HStack>
                                        <Avatar size="xs" icon={<Jazzicon diameter="24" address="0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69" />} />
                                        <Tag>{`${"0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69".substr(0,6)}...${"0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69".substr(-5)}`}</Tag>
                                    </HStack>
                                    <Tag colorScheme="whatsapp">Yes</Tag>
                                    <Text>300 DIx</Text>
                                    <FaExternalLinkAlt size="10px" />
                                </HStack>
                            );
                        })
                    }
                </VStack>
                
            </Card>
        </VStack>
    );
}

export default InformationCards;