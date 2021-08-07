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
import { useState, useContext, useEffect } from "react";
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
import fleekStorage from "@fleekhq/fleek-storage-js";
import { Web3Context } from "../utils/Web3Context";

function RadioCard(props) {
  // console.log(props);
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  console.log(input);

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
  const { allProposalsArray, fetchAllProposals } = useContext(Web3Context);

  const [currentImage, setCurrentImage] = useState(
    "https://wallpaperaccess.com/full/30100.jpg"
  );
  const [proposalData, setProposalData] = useState();
  const [sendImage, setSendImage] = useState();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [claim, setClaim] = useState();
  const [loadingClaim, setLoadingClaim] = useState(true);
  const [claimTitle, setClaimTitle] = useState("");
  const [claimSummary, setClaimSummary] = useState("");
  const [claimAmount, setClaimAmount] = useState(0);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Vote",
    defaultValue: "no",
    onChange: console.log,
  });

  useEffect(() => {
    async function init() {
      const proposalId = allProposalsArray[id][9];

      const myFile = await fleekStorage.getFileFromHash({
        hash: proposalId,
      });

      setClaim(myFile);
      // setClaimTitle(myFile.claimTitle);
      // setClaimTitle(myFile.claimSummary);
      // setClaimAmount(myFile.claimAmount);

      console.log(myFile);
      setLoadingClaim(false);
    }
    init();
  }, [textileClient]);

  useEffect(() => {
    async function init() {
      let claim = await textileClient.findByID(
        ThreadID.fromString(
          "bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q"
        ),
        "claimsData",
        id
      );
      console.log(claim);
      setClaim(claim);

      let messages = await queryThread(
        textileClient,
        "bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q",
        "messagesData",
        { claimId: id }
      );
      console.log(messages);

      setMessages(messages);

      setLoadingClaim(false);
      console.log("listening");
      let closer = await textileClient.listen(
        ThreadID.fromString(
          "bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q"
        ),
        [{ actionTypes: ["CREATE"], collectionName: "messagesData" }],
        (reply, error) => {
          console.log(reply.instance.message);
        }
      );
      return function cleanup() {
        closer();
      };
    }
    if (textileClient) {
      init();
    }
  }, [textileClient]);

  const options = ["Yes", "No"];
  const group = getRootProps();

  const handleImage = ({ target }) => {
    setCurrentImage(target.src);
  };

  const handleMessage = ({ target }) => {
    setMessage(target.value);
  };

  const handleSendImageChange = ({ target }) => {
    setSendImage(target.files[0]);
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

    if (sendImage) {
      let result = await uploadToSlate(sendImage);
      uploadedImage = `https://slate.textile.io/ipfs/${result.data.cid}`;
    }

    let messageObj = {
      message,
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
    setMessage("");
    setSendImage();
    setMessages([...messages, messageObj]);
  };

  return (
    <Grid
      px="250px"
      py="20px"
      width="100%"
      templateColumns="3fr 2fr"
      gridGap={5}
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" width="100%">
        {loadingClaim ? (
          <>
            <HStack width="100%" justifyContent="space-between">
              <Skeleton isLoaded={!loadingClaim}>Loading Claim</Skeleton>
              <Skeleton isLoaded={!loadingClaim}>Claim Status</Skeleton>
            </HStack>

            <Skeleton width="100%">
              <Box height="300px" width="100%">
                Image
              </Box>
            </Skeleton>
          </>
        ) : (
          <>
            <HStack width="100%" justifyContent="space-between">
              <Heading fontSize="24px">{claim.claimTitle}</Heading>
              <Tag>
                {allProposalsArray[id].voting ? (
                  <span> Open </span>
                ) : (
                  <span> Closed </span>
                )}
              </Tag>
            </HStack>
            {claim.images.length == 0 ? null : (
              <>
                <Box mt="10px !important" boxShadow="lg" borderRadius="10px">
                  <Image borderRadius="10px" src={currentImage} />
                </Box>
                <HStack>
                  {claim.images.map((image, index) => {
                    return (
                      <Image
                        onClick={handleImage}
                        borderRadius="10px"
                        height="70px"
                        src={image.url}
                        key={index}
                      />
                    );
                  })}
                  {/* <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://images.firstpost.com/wp-content/uploads/large_file_plugin/2020/02/1582263146_1.jpg" /> */}
                  {/* <Image onClick={handleImage} borderRadius="10px" height="70px" src="https://www.insurancechat.co.za/wp-content/uploads/2021/01/Reen-Tweeling-area-770x445.jpeg" /> */}
                </HStack>
              </>
            )}
            <Text>{claim.claimSummary}</Text>
          </>
        )}

        <Card cardTitle="Cast Your Vote">
          {loadingClaim ? (
            <Spinner margin="auto" borderColor="whatsapp.500" />
          ) : (
            <>
              <VStack width="100%" {...group}>
                {options.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </VStack>
              <Box
                _hover={{ boxShadow: "base", transform: "scale(1.01)" }}
                transition="all .3s"
                textColor="white"
                fontWeight="600"
                width="100%"
                backgroundColor="whatsapp.500"
                borderRadius="20px"
                textAlign="center"
                py={2}
                borderColor="whatsapp.500"
                colorScheme="whatsapp"
                onClick={() => console.log()}
              >
                Vote
              </Box>
            </>
          )}
        </Card>
        <Card cardTitle="Chat">
          {loadingClaim ? (
            <Spinner borderColor="whatsapp.500" margin="auto" />
          ) : (
            <VStack
              height="400px"
              spacing={5}
              justifyContent="flex-end"
              width="100%"
              alignItems="flex-start"
            >
              <VStack alignItems="flex-start" overflowY="scroll" width="100%">
                {messages.map((message) => {
                  return (
                    <HStack
                      // key={message.image}
                      key={message._id}
                      alignItems="flex-end"
                    >
                      <Tooltip
                        placement="top"
                        hasArrow
                        label={`${message.address.substr(
                          0,
                          6
                        )}...${message.address.substr(-4)}`}
                      >
                        <Box
                          borderWidth="2px"
                          padding="2px"
                          borderColor="whatsapp.500"
                          borderStyle="solid"
                          borderRadius="full"
                        >
                          <Avatar
                            size="sm"
                            icon={
                              <Jazzicon
                                diameter="32"
                                address={message.address}
                              />
                            }
                          />
                        </Box>
                      </Tooltip>
                      <VStack
                        alignItems="flex-start"
                        backgroundColor="whatsapp.500"
                        color="white"
                        borderWidth="1px"
                        borderRadius="10px"
                        borderColor="whatsapp.500"
                        padding={3}
                      >
                        {message.image.length > 0 ? (
                          <Image
                            borderRadius="10px"
                            height="200px"
                            src={message.image}
                          />
                        ) : null}
                        <Text>{message.message}</Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
              <HStack>
                {sendImage ? (
                  <HStack
                    borderColor="whatsapp.500"
                    borderWidth="1px"
                    padding={2}
                    borderRadius="10px"
                    key={sendImage.name}
                  >
                    <MdImage />
                    <Text>{sendImage.name}</Text>
                  </HStack>
                ) : null}
              </HStack>

              <HStack width="100%">
                <InputGroup>
                  <Input
                    value={message}
                    onChange={handleMessage}
                    borderRadius="20px"
                    focusBorderColor="whatsapp.500"
                  />
                  <InputRightElement>
                    <IconButton
                      cursor="pointer"
                      as="label"
                      htmlFor="image-input"
                      colorScheme="whatsapp"
                      icon={<ImAttachment />}
                    />
                    <input
                      onChange={(e) => handleSendImageChange(e)}
                      type="file"
                      id="image-input"
                      style={{ display: "none" }}
                    />
                  </InputRightElement>
                </InputGroup>
                <Button onClick={handleSendMessage} colorScheme="whatsapp">
                  Send
                </Button>
              </HStack>
            </VStack>
          )}
        </Card>
      </VStack>
      {loadingClaim ? (
        <InformationCards loadingClaim={loadingClaim} />
      ) : (
        <InformationCards
          author={claim.author}
          startDate={claim.startTime}
          dateOfIncident={claim.dateOfIncident}
          ipfsHash={allProposalsArray[id].ipfsHash}
          yesVotes={allProposalsArray[id].yesVotes}
          noVotes={allProposalsArray[id].noVotes}
        />
      )}
    </Grid>
  );
}

export default VotingPage;
