import { Grid, Heading, VStack, Tag, Image, Box, HStack, Text, Button, useRadio, useRadioGroup, Input, InputRightElement, IconButton, Icon, InputGroup, Avatar, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import Card from "../Components/Card";
import InformationCards from "../Components/InformationCards";
import { ImAttachment } from "react-icons/im";
import Jazzicon from "../Components/Jazzicon";


function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    

    return (
        <Box width="100%" as="label">
            <input {...input} />
            <Box textAlign="center" py={2} {...checkbox} borderRadius="20px" cursor="pointer" width="100%" borderColor="whatsapp.500" color="whatsapp.500" borderWidth="1px" _checked={{ boxShadow:"base", borderColor: "whatsapp.800", fontWeight: "700" }}>
                {props.children}
            </Box>
        </Box>
         
    );
}

function VotingPage() {
    const [ currentImage, setCurrentImage ] = useState("https://wallpaperaccess.com/full/30100.jpg");
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Vote",
        defaultValue:"no",
        onChange: console.log
    });

    const options = ["Yes", "No"];
    const group = getRootProps();

    const messages = [""];

    const handleImage = ({ target }) => {
        setCurrentImage(target.src);
    }

    return (
        <Grid px="250px" py="20px" width="100%" templateColumns="3fr 2fr" gridGap={5} alignItems="flex-start">
            
            <VStack alignItems="flex-start" width="100%">
                <Heading fontSize="24px">Flood Destoyed my farm!</Heading>
                <Tag>Open</Tag>
                <Box mt="10px !important" boxShadow="lg" borderRadius="10px">
                    <Image  borderRadius="10px" src={currentImage} />
                </Box>
                <HStack>
                    <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://psmag.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTY0NTc1NjUzNDA2OTc1NzUz/gettyimages-1152467877.jpg" />
                    <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://images.firstpost.com/wp-content/uploads/large_file_plugin/2020/02/1582263146_1.jpg" />
                    <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://www.insurancechat.co.za/wp-content/uploads/2021/01/Reen-Tweeling-area-770x445.jpeg" />
                </HStack>
                <Text>
                    Summary of the incident.
                </Text>
                <Card cardTitle="Cast Your Vote">
                    <VStack width="100%" {...group}>
                        {
                            options.map((value) => {
                                const radio = getRadioProps({ value });
                                return (
                                    <RadioCard key={value} {...radio}>
                                        {value}
                                    </RadioCard>
                                )
                            })
                        }
                    </VStack>
                    <Box _hover={{ boxShadow:"base", transform: "scale(1.01)" }} transition="all .3s" textColor="white" fontWeight="600" width="100%" backgroundColor="whatsapp.500" borderRadius="20px" textAlign="center" py={2} borderColor="whatsapp.500" colorScheme="whatsapp">Vote</Box>
                </Card>
                <Card cardTitle="Chat">
                    <VStack height="400px" spacing={5} justifyContent="flex-end" width="100%" alignItems="flex-start">
                        {
                            messages.map((message) => {
                                return (
                                    <HStack key={0} alignItems="flex-end">
                                        <Tooltip placement="top" hasArrow label={`${"0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69".substr(0,6)}...${"0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69".substr(-4)}`}>
                                            <Box borderWidth="2px" padding="2px" borderColor="whatsapp.500" borderStyle="solid" borderRadius="full">
                                                <Avatar size="sm" icon={<Jazzicon diameter="32" address="0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69" />} />
                                            </Box>
                                        </Tooltip>
                                        <VStack alignItems="flex-start" backgroundColor="whatsapp.500" color="white" borderWidth="1px" borderRadius="10px" borderColor="whatsapp.500" padding={3}>
                                            <Image borderRadius="10px" height="200px" src="https://cropwatch.unl.edu/styles/hero/public/images/hero/2019/Flood-1a.jpg?itok=1uCcg0kG" />
                                            <Text>
                                                Here is some more proof.
                                            </Text>
                                        </VStack>
                                    </HStack>
                                );
                            })
                        }
                        
                        <HStack width="100%">
                            <InputGroup>
                                <Input borderRadius="20px" focusBorderColor="whatsapp.500" />
                                    
                                    <InputRightElement>
                                        <IconButton cursor="pointer" as="label" htmlFor="image-input" colorScheme="whatsapp" icon={<ImAttachment />} />
                                        <input type="file" id="image-input" style={{ display: "none"}} /> 
                                    </InputRightElement>                                
                            </InputGroup>
                            <Button colorScheme="whatsapp">Send</Button>
                        </HStack>
                    </VStack>
                </Card>
            </VStack>
            <InformationCards />
        </Grid>
    );
}

export default VotingPage;