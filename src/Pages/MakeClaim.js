import { Grid, VStack, Heading, InputGroup, FormControl, HStack, Image, Spinner, Box, Text, Button, FormLabel, Input, FormHelperText, Textarea, InputRightAddon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import Card from "../Components/Card";
import { connectToInfuraIpfs } from "../utils/ipfs";

var ipfs;

function MakeClaim() {
    const [ currentImage, setCurrentImage ] = useState(undefined);
    const [ images, setImages ] = useState([]);

    useEffect(() => {
        async function init() {
            ipfs = await connectToInfuraIpfs();
        }
        init();
    }, [])

    const handleImage = async (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        let filesWithState = files.map((file) => {
            return { url: "", isUploading: true };
        });
        let filesWithStateArray = [...images];
        for await(const image of files) {
            const reader = new window.FileReader();
            console.log(reader.readyState);
            reader.readAsArrayBuffer(image);
            let obj;
            reader.onloadend = async () => {
                let imageData = Buffer(reader.result);
                console.log(imageData);
                const file = await ipfs.add(imageData);
                console.log(file.path);
                let url = `https://ipfs.io/ipfs/${file.path}`;
                console.log(url);
                filesWithStateArray.push({ url, isUploading: false });
                setImages([...filesWithStateArray]);
                setCurrentImage(filesWithStateArray[0].url);
            }
        } 
    }

    const handleCurrentImage = (e) => {
        e.preventDefault();
        setCurrentImage(e.target.src);
    }

    return (
        <Grid paddingBottom="20px" pt="20px" height="100%" px="250px" width="100%" templateColumns="2fr 1fr" gridGap={5} alignItems="flex-start">
            <VStack width="100%" alignItems="flex-start">
                <Heading as="h4" fontSize="28px">
                    Make a Claim
                </Heading>
                <form style={{ width: "100%" }}>
                    <VStack width="100%" spacing={5} alignItems="flex-start">
                        <input multiple onChange={handleImage} type="file" style={{display: "none"}} id="image-input" />
                        {
                            images.length == 0 ?
                            <Box cursor="pointer" as="label" htmlFor="image-input" px="35px" width="100%" borderRadius="10px" height="70px" borderWidth="1px" borderStyle="solid" borderColor="whatsapp.500" >
                                <VStack height="100%" width="100%" justifyContent="center">
                                    <TiPlus style={{ fill: "#22C35E" }} />
                                    <Text fontWeight="600" color="#22C35E">Image</Text>
                                </VStack>
                            </Box>
                            :
                            <>
                                <Box mt="10px !important" boxShadow="lg" borderRadius="10px">
                                    <Image borderRadius="10px" src={currentImage} />
                                </Box>
                                <HStack width="100%" overflowX="scroll">
                                    {
                                        images.map((image, index) => {
                                            return (
                                                image.isUploading ?
                                                <Spinner /> 
                                                :
                                                <Image key={index} onClick={(e) => {handleCurrentImage(e)}} borderRadius="10px" height="70px" src={image.url} />
                                            );
                                        })
                                    }
                                    <Box cursor="pointer" as="label" htmlFor="image-input" px="35px" borderRadius="10px" height="70px" borderWidth="1px" borderStyle="solid" borderColor="whatsapp.500" >
                                        <VStack height="100%" width="100%" justifyContent="center">
                                            <TiPlus style={{ fill: "#22C35E" }} />
                                            <Text fontWeight="600" color="#22C35E">Image</Text>
                                        </VStack>
                                    </Box>
                                </HStack>
                            </>    
                        }
                        
                        <VStack spacing={5} width="100%">
                            <FormControl isRequired> 
                                <FormLabel>Claim Title</FormLabel>
                                <Input />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Summary Of Incident</FormLabel>
                                <Textarea row="10" />
                                <FormHelperText>Try to precise</FormHelperText>
                            </FormControl>
                            <VStack width="100%">
                                <HStack width="100%">
                                    <FormControl isRequired>
                                        <FormLabel>Date Of Incident</FormLabel>
                                        <Input type="date" />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Start Time</FormLabel>
                                        <Input type="datetime-local" />
                                    </FormControl>                                
                                </HStack>
                                <HStack width="100%">
                                    <FormControl isRequired>
                                        <FormLabel>Claim Amount</FormLabel>
                                        <InputGroup>
                                            <Input type="number" />
                                            <InputRightAddon>
                                                ETH
                                            </InputRightAddon>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Block Number</FormLabel>
                                        <Input type="number" />
                                    </FormControl>                                
                                </HStack>
                            </VStack>
                            <Button mt="30px !important" width="100%" textTransform="uppercase" type="submit" colorScheme="whatsapp">Submit Claim</Button>
                        </VStack>
                    </VStack>
                </form>
            </VStack>
            <VStack width="100%">
                <Card cardTitle="Claimable">
                    <Heading textColor="whatsapp.500" fontSize="24px" as="h3">1,301 ETH</Heading>
                </Card>
            </VStack>
        </Grid>
    );
}

export default MakeClaim;