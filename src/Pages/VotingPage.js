import { Grid, Heading, VStack, Tag, Image, Box, HStack, Text, Button, useRadio, useRadioGroup, Input, InputRightElement, IconButton, Icon, InputGroup, Avatar, Tooltip } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import Card from "../Components/Card";
import InformationCards from "../Components/InformationCards";
import { ImAttachment } from "react-icons/im";
import { MdImage } from "react-icons/md";
import Jazzicon from "../Components/Jazzicon";
import { AppContext } from "../utils/AppContext";
import { uploadToSlate } from "../utils/slate";
import { addToThread } from "../utils/textile";
import { ThreadID } from "@textile/hub";

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

    

    const { textileClient } = useContext(AppContext);
    const [ currentImage, setCurrentImage ] = useState("https://wallpaperaccess.com/full/30100.jpg");
    const [ sendImage, setSendImage ] = useState();
    const [ message, setMessage ] = useState(); 
    const [ messages, setMessages ] = useState([]);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "Vote",
        defaultValue:"no",
        onChange: console.log
    });

    useEffect(() => {
        async function init() {
            console.log("listening");
            let closer = await textileClient.listen(ThreadID.fromString("bafkyaidn2wzfyela7zyi5w63hudaf4sx67duwjdbhxkhgwo3abiozoq"), [{actionTypes: ['CREATE'], collectionName: "messageData" }], (reply, error) => {
                
            });
            return function cleanup() {
                closer();
            }
        }
        if(textileClient) {
            init();
        }
    },[textileClient]);

    const options = ["Yes", "No"];
    const group = getRootProps();

    const handleImage = ({ target }) => {
        setCurrentImage(target.src);
    }

    const handleMessage = ({ target }) => {
        setMessage(target.value);
    }

    const handleSendImageChange = ({ target }) => {
        setSendImage(target.files[0]);
    }

    const handleSendMessage = async () => {
        let uploadedImage = "";
        if(sendImage) {
            let result = await uploadToSlate(sendImage);
            uploadedImage = `https://slate.textile.io/ipfs/${result.data.cid}`;
        }
        let messageObj = {
            message,
            image: uploadedImage,
            address: "0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69",
            claimId: "01fb2efkvfqh51vaq91paws6my"
        }
        let resultFromTextile = await addToThread(textileClient, "bafkyaidn2wzfyela7zyi5w63hudaf4sx67duwjdbhxkhgwo3abiozoq", "messageData", messageObj);
        console.log(resultFromTextile);
        console.log("Message Sent", messageObj);
        setMessage("");
        setSendImage();
        setMessages([...messages, messageObj]);
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
                <Card  cardTitle="Chat">
                    <VStack  height="400px" spacing={5} justifyContent="flex-end" width="100%" alignItems="flex-start">
                        <VStack alignItems="flex-start" overflowY="scroll" width="100%">
                            {
                                messages.map((message) => {
                                    return (
                                        <HStack key={message.image} alignItems="flex-end">
                                            <Tooltip placement="top" hasArrow label={`${message.address.substr(0,6)}...${message.address.substr(-4)}`}>
                                                <Box borderWidth="2px" padding="2px" borderColor="whatsapp.500" borderStyle="solid" borderRadius="full">
                                                    <Avatar size="sm" icon={<Jazzicon diameter="32" address={message.address} />} />
                                                </Box>
                                            </Tooltip>
                                            <VStack alignItems="flex-start" backgroundColor="whatsapp.500" color="white" borderWidth="1px" borderRadius="10px" borderColor="whatsapp.500" padding={3}>
                                                {
                                                    message.image.length > 0 ? 
                                                    <Image borderRadius="10px" height="200px" src={message.image} />
                                                    :
                                                    null
                                                }
                                                <Text>
                                                    {message.message}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    );
                                })
                            }
                        </VStack>
                        <HStack>
                            {
                                sendImage ?
                                <HStack borderColor="whatsapp.500" borderWidth="1px" padding={2} borderRadius="10px" key={sendImage.name}>
                                    <MdImage />
                                    <Text>{sendImage.name}</Text>
                                </HStack>
                                :
                                null                                
                            }
                        </HStack>
                        
                        <HStack width="100%">
                            <InputGroup>
                                <Input value={message} onChange={handleMessage} borderRadius="20px" focusBorderColor="whatsapp.500" />
                                    <InputRightElement>
                                        <IconButton cursor="pointer" as="label" htmlFor="image-input" colorScheme="whatsapp" icon={<ImAttachment />} />
                                        <input onChange={(e) => handleSendImageChange(e)} type="file" id="image-input" style={{ display: "none"}} /> 
                                    </InputRightElement>                                
                            </InputGroup>
                            <Button onClick={handleSendMessage} colorScheme="whatsapp">Send</Button>
                        </HStack>
                    </VStack>
                </Card>
            </VStack>
            <InformationCards />
        </Grid>
    );
}

export default VotingPage;