import {
  Grid,
  Heading,
  VStack,
  Tag,
  Image,
  Box,
  HStack,
  Text,
  Button,
  useRadio,
  useRadioGroup,
  Input,
  Skeleton,
  InputRightElement,
  IconButton,
  Icon,
  InputGroup,
  Avatar,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { useState, useContext, useEffect, useReducer } from "react";
import Card from "../Components/Card";
import InformationCards from "../Components/InformationCards";
import { ImAttachment } from "react-icons/im";
import { MdImage } from "react-icons/md";
import Jazzicon from "../Components/Jazzicon";
import { AppContext } from "../utils/AppContext";
import { uploadToSlate } from "../utils/slate";
import { addToThread, queryThread } from "../utils/textile";
import { Client, ThreadID } from "@textile/hub";
import { useParams } from "react-router-dom";


const ACTIONS = {
  SET_CURR_IMAGE: "set-curr-image",
  SET_SEND_IMAGE: "set-send-image",
  SET_MESSAGE: "set-message",
  SET_MESSAGES: "set-messages",
  SET_CLAIM: "set-claim",
  SET_LOADING_CLAIM: "set-loading-claim",
  SET_VOTE: "set-vote"
}

function stateReducer(state, action) {
  switch(action.type) {
      case ACTIONS.SET_CURR_IMAGE:
          return { ...state, currentImage: action.payload }
      case ACTIONS.SET_SEND_IMAGE:
          return { ...state, sendImage: action.payload }
      case ACTIONS.SET_MESSAGE:
          return { ...state, message: action.payload }
      case ACTIONS.SET_MESSAGES:
          return { ...state, messages: [...action.payload] }
      case ACTIONS.SET_CLAIM:
          return { ...state, claim: action.payload }
      case ACTIONS.SET_LOADING_CLAIM:
          return { ...state, loadingClaim: action.payload }
      case ACTIONS.SET_VOTE:
          return { ...state, vote: action.payload }
      default:
          return state;
  }
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box width="100%" as="label">
      <input {...input} />
      <Box
        textAlign="center"
        py={2}
        {...checkbox}
        borderRadius="20px"
        cursor="pointer"
        width="100%"
        borderColor="whatsapp.500"
        color="whatsapp.500"
        borderWidth="1px"
        _checked={{
          boxShadow: "base",
          borderColor: "whatsapp.800",
          fontWeight: "700",
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function VotingPage(props) {
  const { textileClient } = useContext(AppContext);

  const [ state, dispatch ] = useReducer(stateReducer, { currentImage: "", sendImage: "", message: "", messages: [], claim: "", loadingClaim: true, vote: 0 });
  
  const { id } = useParams();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Vote",
    defaultValue: "No",
    onChange: (e) => handleRadioChange(e)
  });

  useEffect(() => {
    async function init() {
        
        let claim = await textileClient.findByID(ThreadID.fromString("bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q"), "claimsData", id);
        console.log(claim);
        dispatch({ type: ACTIONS.SET_CLAIM, payload: claim });

        let messages = await queryThread(textileClient, "bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q", "messagesData", { claimId: id });
        console.log(messages); 

        dispatch({ type: ACTIONS.SET_MESSAGES, payload: messages })

        dispatch({ type: ACTIONS.SET_LOADING_CLAIM, payload: false });
        console.log("listening");
        let closer = await textileClient.listen(ThreadID.fromString("bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q"), [{actionTypes: ['CREATE'], collectionName: "messagesData" }], (reply, error) => {
            dispatch({ type: ACTIONS.SET_MESSAGES, payload: [...messages, reply.instance] });    
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
    dispatch({ type: ACTIONS.SET_CURR_IMAGE, payload: target.src });
  };

  const handleRadioChange = (e) => {
    if(e == "Yes") {
        dispatch({ type: ACTIONS.SET_VOTE, payload: 1 });
    } else {
        dispatch({ type: ACTIONS.SET_VOTE, payload: 0 });
    }
  }

  const handleMessage = ({ target }) => {
    dispatch({ type: ACTIONS.SET_MESSAGE, payload: target.value });
  };

  const handleSendImageChange = ({ target }) => {
    dispatch({ type: ACTIONS.SET_SEND_IMAGE, payload: target.files[0] });
  };

  // const handleSendMessage = async () => {
  //   let uploadedImage = "";
  //   if (sendImage) {
  //     let result = await uploadToSlate(sendImage);
  //     uploadedImage = `https://slate.textile.io/ipfs/${result.data.cid}`;
  //   }
  //   let messageObj = {
  //     message,
  //     image: uploadedImage,
  //     address: "0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69",
  //     claimId: "01fb2efkvfqh51vaq91paws6my",
  //   };
  //   let resultFromTextile = await addToThread(
  //     textileClient,
  //     "bafkyaidn2wzfyela7zyi5w63hudaf4sx67duwjdbhxkhgwo3abiozoq",
  //     "messageData",
  //     messageObj
  //   );
  //   console.log(resultFromTextile);
  //   console.log("Message Sent", messageObj);
  //   setMessage("");
  //   setSendImage();
  //   setMessages([...messages, messageObj]);
  // };

  const handleSendMessage = async () => {
    let uploadedImage = "";

    if (state.sendImage) {
      let result = await uploadToSlate(state.sendImage);
      uploadedImage = `https://slate.textile.io/ipfs/${result.data.cid}`;
    }

    let messageObj = {
      message: state.message,
      image: uploadedImage,
      address: "0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69",
      claimId: id,
    };

    let resultFromTextile = await addToThread(
      textileClient,
      "bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q",
      "messagesData",
      messageObj
    );
    console.log(resultFromTextile);
    console.log("Message Sent", messageObj);
    dispatch({ type: ACTIONS.SET_MESSAGE, payload: "" }); 
    dispatch({ type: ACTIONS.SET_SEND_IMAGE, payload: "" });
    dispatch({ type: ACTIONS.SET_MESSAGES, payload: [...state.messages, messageObj] });
  };

  return (
    <Grid px="250px" py="20px" width="100%" templateColumns="3fr 2fr" gridGap={5} alignItems="flex-start">          
      <VStack alignItems="flex-start" width="100%">
          {
              state.loadingClaim ?    
              <> 
                  <HStack width="100%" justifyContent="space-between">
                      <Skeleton isLoaded={!state.loadingClaim}>
                          Loading Claim
                      </Skeleton>
                      <Skeleton isLoaded={!state.loadingClaim}>
                          Claim Status
                      </Skeleton>
                  </HStack>
                  
                  <Skeleton width="100%">
                      <Box height="300px" width="100%">Image</Box>
                  </Skeleton>
              </>
              :
              <>
                  <HStack width="100%" justifyContent="space-between">
                      <Heading fontSize="24px">{state.claim.claimTitle}</Heading>
                      <Tag>Open</Tag>
                  </HStack>
                  {
                      state.claim.images.length == 0 ?
                      null
                      :
                      <>
                          <Box mt="10px !important" boxShadow="lg" borderRadius="10px">
                          <Image  borderRadius="10px" src={state.currentImage} />
                          </Box>
                          <HStack>
                          {
                              state.claim.images.map((image) => {
                                  return (
                                      <Image onClick={handleImage} borderRadius="10px" height="70px" src={image.url} />
                                  );  
                              })
                          }
                          {/* <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://images.firstpost.com/wp-content/uploads/large_file_plugin/2020/02/1582263146_1.jpg" /> */}
                          {/* <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://www.insurancechat.co.za/wp-content/uploads/2021/01/Reen-Tweeling-area-770x445.jpeg" /> */}
                          </HStack>
                      </>
                  }
                  <Text>
                      {state.claim.claimSummary}
                  </Text>
              </>
          }
          
          
          
          <Card cardTitle="Cast Your Vote">
              {
                  state.loadingClaim ?
                  <Spinner margin="auto" borderColor="whatsapp.500" />
                  :
                  <>
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
                  </>
              }
              </Card>
          <Card  cardTitle="Chat">
              {
                  state.loadingClaim ?
                  <Spinner borderColor="whatsapp.500" margin="auto" />
                  :
                  <VStack  height="400px" spacing={5} justifyContent="flex-end" width="100%" alignItems="flex-start">
                      <VStack alignItems="flex-start" overflowY="scroll" width="100%">
                          {
                              state.messages.map((message) => {
                                  return (
                                      <HStack key={message.image} key={message._id} alignItems="flex-end">
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
                              state.sendImage ?
                              <HStack borderColor="whatsapp.500" borderWidth="1px" padding={2} borderRadius="10px" key={state.sendImage.name}>
                                  <MdImage />
                                  <Text>{state.sendImage.name}</Text>
                              </HStack>
                              :
                              null                                
                          }
                      </HStack>
                      
                      <HStack width="100%">
                          <InputGroup>
                              <Input value={state.message} onChange={handleMessage} borderRadius="20px" focusBorderColor="whatsapp.500" />
                                  <InputRightElement>
                                      <IconButton cursor="pointer" as="label" htmlFor="image-input" colorScheme="whatsapp" icon={<ImAttachment />} />
                                      <input onChange={(e) => handleSendImageChange(e)} type="file" id="image-input" style={{ display: "none"}} /> 
                                  </InputRightElement>                                
                          </InputGroup>
                          <Button onClick={handleSendMessage} colorScheme="whatsapp">Send</Button>
                      </HStack>
                  </VStack>
              }
          </Card>
      </VStack>
      {
          state.loadingClaim ?
          <InformationCards loadingClaim={state.loadingClaim} />
          :
          <InformationCards author={state.claim.author} startDate={state.claim.startTime} dateOfIncident={state.claim.dateOfIncident}  />
      }
    </Grid>
  );
}

export default VotingPage;
