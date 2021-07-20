import { Grid, VStack, Heading, InputGroup, FormControl, HStack, Image, Skeleton, Spinner, Box, Text, Button, FormLabel, Input, FormHelperText, Textarea, InputRightAddon, SkeletonText } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import Card from "../Components/Card";
import { connectToInfuraIpfs } from "../utils/ipfs";
import axios from "axios";


var ipfs;

function MakeClaim() {
    const [ currentImage, setCurrentImage ] = useState(undefined);
    const [ images, setImages ] = useState([]);
    const [ isPageLoading, setIsPageLoading ] = useState(true);

    useEffect(() => {
        async function init() {
            setIsPageLoading(true);
            ipfs = await connectToInfuraIpfs();
            const response = await fetch('https://slate.host/api/v2/get', 
            {  
                method: 'GET',  
                headers: {    
                    'Content-Type': 'application/json',    
                    Authorization: 'Basic SLA99335abb-4736-4871-b037-0241236029a7TE',  
                }
            });
            console.log(response);
            if (!response) {  
                console.log("No response");  
                return;
            }
            const json = await response.json();
            if (json.error) {  
                console.log(json);
            } else {  
                const collections = json.collections;  
                const user = json.user;
                console.log(collections);
            }
            setIsPageLoading(false);
        }
        init();
    }, [])

    // const handleImage = async (e) => {
    //     e.preventDefault();
    //     let files = Array.from(e.target.files);
    //     let filesWithState = files.map((file) => {
    //         return { url: "", isUploading: true };
    //     });
    //     setImages([...images, ...filesWithState]);
    //     let filesWithStateArray = [...images];
    //     for await(const image of files) {
    //         const reader = new window.FileReader();
    //         console.log(reader.readyState);
    //         reader.readAsArrayBuffer(image);
    //         let obj;
    //         reader.onloadend = async () => {
    //             let imageData = Buffer(reader.result);
    //             console.log(imageData);
    //             const file = await ipfs.add(imageData);
    //             console.log(file.path);
    //             let url = `https://ipfs.io/ipfs/${file.path}`;
    //             console.log(url);
    //             filesWithStateArray.push({ url, isUploading: false });
    //             setImages([...filesWithStateArray]);
    //             setCurrentImage(filesWithStateArray[0].url);
    //         }
    //     } 
    // }

    const handleImage = async (e) => {
        const url = 'https://uploads.slate.host/api/public/0e3b9b38-1c95-4fe9-ab18-3a025b0ec8a0';
        let file = e.target.files[0];
        let data = new FormData();
        data.append("data", file);
        const response = await fetch(url, 
            {  
                method: 'POST',  
                headers: {    
                    Authorization: 'Basic SLA99335abb-4736-4871-b037-0241236029a7TE', 
                    // API key  
                },  
                body: data
            }
        );
        console.log(response);
    }

    const handleCurrentImage = (e) => {
        e.preventDefault();
        setCurrentImage(e.target.src);
    }

    return (
        <Grid paddingBottom="20px" pt="20px" height="100%" px="250px" width="100%" templateColumns="2fr 1fr" gridGap={5} alignItems="flex-start">
            <VStack width="100%" alignItems="flex-start">
                <Skeleton isLoaded={!isPageLoading}>
                    <Heading as="h4" fontSize="28px">
                        Make a Claim
                    </Heading>
                </Skeleton>
                <form style={{ width: "100%" }}>
                    <VStack width="100%" spacing={5} alignItems="flex-start">
                        <input multiple onChange={handleImage} type="file" style={{display: "none"}} id="image-input" />
                        {
                            images.length == 0 ?
                                isPageLoading ?
                                <Spinner colorScheme="whatsapp" color="whatsapp.500" alignSelf="center" />
                                :
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
                                <Skeleton isLoaded={!isPageLoading}>
                                    <FormLabel>Claim Title</FormLabel>
                                </Skeleton>
                                <Skeleton isLoaded={!isPageLoading}>
                                    <Input />
                                </Skeleton>
                            </FormControl>
                            <FormControl isRequired>
                                <Skeleton isLoaded={!isPageLoading}>
                                    <FormLabel>Summary of Incident</FormLabel>
                                </Skeleton>
                                <Skeleton isLoaded={!isPageLoading}>
                                    <Textarea row="10" />
                                </Skeleton>
                                <Skeleton isLoaded={!isPageLoading}>
                                    <FormHelperText>Try to precise</FormHelperText>
                                </Skeleton>
                            </FormControl>
                            <VStack width="100%">
                                <HStack width="100%">
                                    <FormControl isRequired>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <FormLabel>Date of Incident</FormLabel>
                                        </Skeleton>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <Input type="date" />
                                        </Skeleton>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <FormLabel>Start Time</FormLabel>
                                        </Skeleton>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <Input type="datetime-local" />
                                        </Skeleton>
                                    </FormControl>                                
                                </HStack>
                                <HStack width="100%">
                                    <FormControl isRequired>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <FormLabel>Claim Amount</FormLabel>
                                        </Skeleton>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <InputGroup>
                                                <Input type="number" />
                                                <InputRightAddon>
                                                    ETH
                                                </InputRightAddon>
                                            </InputGroup>
                                        </Skeleton>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <FormLabel>Block Number</FormLabel>
                                        </Skeleton>
                                        <Skeleton isLoaded={!isPageLoading}>
                                            <Input type="number" />
                                        </Skeleton>
                                    </FormControl>                                
                                </HStack>
                            </VStack>
                            <Button isLoading={isPageLoading} mt="30px !important" width="100%" textTransform="uppercase" type="submit" colorScheme="whatsapp">Submit Claim</Button>
                        </VStack>
                    </VStack>
                </form>
            </VStack>
            <VStack width="100%">
                <Card isLoading={isPageLoading} cardTitle="Claimable">
                    <Skeleton isLoaded={!isPageLoading}>
                        <Heading textColor="whatsapp.500" fontSize="24px" as="h3">1,301 ETH</Heading>
                    </Skeleton>
                </Card>
            </VStack>
        </Grid>
    );
}

export default MakeClaim;