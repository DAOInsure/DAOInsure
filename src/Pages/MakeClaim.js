import {
	Grid,
	VStack,
	Heading,
	InputGroup,
	FormControl,
	HStack,
	Image,
	Skeleton,
	Spinner,
	Box,
	Text,
	Button,
	FormLabel,
	Input,
	FormHelperText,
	Textarea,
	InputRightAddon,
	SkeletonText,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { TiPlus } from "react-icons/ti";
import Card from "../Components/Card";
// import { connectToInfuraIpfs } from "../utils/ipfs";
import { addToThread, getClient } from "../utils/textile";
import { AppContext } from "../utils/AppContext";
import { uploadToSlate } from "../utils/slate";
// import fleekStorage from "@fleekhq/fleek-storage-js";
import { v4 as uuidv4 } from "uuid";
import { Web3Context } from "../utils/Web3Context";

var ipfs;

function MakeClaim() {
	const [currentImage, setCurrentImage] = useState(undefined);
	const [images, setImages] = useState([]);
	const [isPageLoading, setIsPageLoading] = useState(false);
	const { textileClient } = useContext(AppContext);
	const [claimTitle, setClaimTitle] = useState();
	const [claimSummary, setClaimSummary] = useState();
	const [dateOfIncident, setDateOfIncident] = useState();
	const [startTime, setStartTime] = useState();

	const web3Context = useContext(Web3Context);
	const {
		createProposal,
		signerAddress,
		claimableAmount,
		getClaimableAmount,
	} = web3Context;

	useEffect(() => {
		getClaimableAmount();
	}, []);

	const handleImage = async (e) => {
		console.log("uploading");
		let file = e.target.files[0];
		try {
			let result = await uploadToSlate(file);
			setImages([
				...images,
				{
					isUploading: false,
					url: `https://slate.textile.io/ipfs/${result.data.cid}`,
				},
			]);
			setCurrentImage(`https://slate.textile.io/ipfs/${result.data.cid}`);
			console.log("uploaded");
		} catch (e) {
			console.log(e);
		}
	};

	const handleCurrentImage = (e) => {
		e.preventDefault();
		setCurrentImage(e.target.src);
	};

	const handleInputChange = (e, setter) => {
		e.preventDefault();
		setter(e.target.value);
	};

	const handleClaimSubmit = async (e) => {
		e.preventDefault();
		let imageUrls = images.map((image) => {
			return image.url;
		});
		let claimObj = {
			images: imageUrls,
			claimTitle,
			claimSummary,
			dateOfIncident,
			claimAmount: claimableAmount,
			author: signerAddress,
		};
		console.log(claimObj);

		// tried using fleek instead of threadDB.
		// let response = await fleekStorage.upload({
		// 	apiKey: "3aFyv9UlnpyVvuhdoy+WMA==",
		// 	apiSecret: "vUREhYRSH5DP8WehKP+N8jTLoOJUBw+RA9TPLUKneK8=",
		// 	key: uuidv4(),
		// 	data: JSON.stringify(claimObj),
		// });

		// adding claim data to threadDB.
		let response = await addToThread(
			textileClient,
			"bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q",
			"claimsData",
			claimObj
		);

		// create proposal on contract basically store the hash.
		createProposal(
			claimTitle,
			(new Date(dateOfIncident).getTime() / 1000).toString(),
			response.hash
		);
	};

	return (
		<Grid
			paddingBottom='20px'
			pt='20px'
			height='100%'
			px='250px'
			width='100%'
			templateColumns='2fr 1fr'
			gridGap={5}
			alignItems='flex-start'>
			<VStack width='100%' alignItems='flex-start'>
				<Skeleton isLoaded={!isPageLoading}>
					<Heading as='h4' fontSize='28px'>
						Make a Claim
					</Heading>
				</Skeleton>
				<form style={{ width: "100%" }}>
					<VStack width='100%' spacing={5} alignItems='flex-start'>
						<input
							multiple
							onChange={(e) => handleImage(e)}
							type='file'
							style={{ display: "none" }}
							id='image-input'
							accept='image/*'
						/>
						{images.length == 0 ? (
							isPageLoading ? (
								<Spinner
									colorScheme='whatsapp'
									color='whatsapp.500'
									alignSelf='center'
								/>
							) : (
								<Box
									cursor='pointer'
									as='label'
									htmlFor='image-input'
									px='35px'
									width='100%'
									borderRadius='10px'
									height='70px'
									borderWidth='1px'
									borderStyle='solid'
									borderColor='whatsapp.500'>
									<VStack
										height='100%'
										width='100%'
										justifyContent='center'>
										<TiPlus style={{ fill: "#22C35E" }} />
										<Text fontWeight='600' color='#22C35E'>
											Image
										</Text>
									</VStack>
								</Box>
							)
						) : (
							<>
								<Box
									mt='10px !important'
									boxShadow='lg'
									borderRadius='10px'>
									<Image
										borderRadius='10px'
										src={currentImage}
									/>
								</Box>
								<HStack width='100%' overflowX='scroll'>
									{images.map((image, index) => {
										return image.isUploading ? (
											<Spinner key={index} />
										) : (
											<Image
												key={image.url}
												onClick={(e) => {
													handleCurrentImage(e);
												}}
												borderRadius='10px'
												height='70px'
												src={image.url}
											/>
										);
									})}
									<Box
										cursor='pointer'
										as='label'
										htmlFor='image-input'
										px='35px'
										borderRadius='10px'
										height='70px'
										borderWidth='1px'
										borderStyle='solid'
										borderColor='whatsapp.500'>
										<VStack
											height='100%'
											width='100%'
											justifyContent='center'>
											<TiPlus
												style={{ fill: "#22C35E" }}
											/>
											<Text
												fontWeight='600'
												color='#22C35E'>
												Image
											</Text>
										</VStack>
									</Box>
								</HStack>
							</>
						)}

						<VStack spacing={5} width='100%'>
							<FormControl isRequired>
								<Skeleton isLoaded={!isPageLoading}>
									<FormLabel>Claim Title</FormLabel>
								</Skeleton>
								<Skeleton isLoaded={!isPageLoading}>
									<Input
										onChange={(e) =>
											handleInputChange(e, setClaimTitle)
										}
									/>
								</Skeleton>
							</FormControl>
							<FormControl isRequired>
								<Skeleton isLoaded={!isPageLoading}>
									<FormLabel>Summary of Incident</FormLabel>
								</Skeleton>
								<Skeleton isLoaded={!isPageLoading}>
									<Textarea
										onChange={(e) =>
											handleInputChange(
												e,
												setClaimSummary
											)
										}
										row='10'
									/>
								</Skeleton>
								<Skeleton isLoaded={!isPageLoading}>
									<FormHelperText>
										Try to precise
									</FormHelperText>
								</Skeleton>
							</FormControl>
							<VStack width='100%'>
								<HStack width='100%'>
									<FormControl isRequired>
										<Skeleton isLoaded={!isPageLoading}>
											<FormLabel>
												Date of Incident
											</FormLabel>
										</Skeleton>
										<Skeleton isLoaded={!isPageLoading}>
											<Input
												onChange={(e) =>
													handleInputChange(
														e,
														setDateOfIncident
													)
												}
												type='date'
											/>
										</Skeleton>
									</FormControl>
								</HStack>
							</VStack>
							<Button
								onClick={(e) => handleClaimSubmit(e)}
								isLoading={isPageLoading}
								mt='30px !important'
								width='100%'
								textTransform='uppercase'
								type='submit'
								colorScheme='whatsapp'>
								Submit Claim
							</Button>
						</VStack>
					</VStack>
				</form>
			</VStack>
			<VStack width='100%'>
				<Card isLoading={isPageLoading} cardTitle='Claimable Amount'>
					<Skeleton isLoaded={!isPageLoading}>
						<Heading
							textColor='whatsapp.500'
							fontSize='24px'
							as='h3'>
							{parseFloat(claimableAmount).toFixed(6)} DAI
						</Heading>
					</Skeleton>
				</Card>
			</VStack>
		</Grid>
	);
}

export default MakeClaim;
