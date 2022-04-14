import {
	HStack,
	Grid,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Button,
} from "@chakra-ui/react";
import ClaimsList from "../Components/ClaimsList";
import Stats from "../Components/Stats";
import GreenTag from "../Components/GreenTag";
import { Link } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import { queryThread } from "../utils/textile";
import { useState, useEffect, useContext } from "react";
import { Web3Context } from "../utils/Web3Context";

function ClaimsPage() {
	const { textileClient } = useContext(AppContext);
	const [openClaims, setOpenClaims] = useState();
	const [isLoadingOpenClaims, setIsLoadingOpenClaims] = useState(true);

	const web3Context = useContext(Web3Context);
	const {
		fetchAllProposals,
		allProposalsArray,
		openProposalsArray,
		acceptedProposalsArray,
		rejectedProposalsArray,
		daoMemberCount,
		setDaoMemberCount,
	} = web3Context;

	useEffect(() => {
		async function init() {
			console.log(textileClient);
			if (textileClient) {
				// textile database querying the thread using threadId and collection where claims are present.
				let openClaims = await queryThread(
					textileClient,
					"bafkyspsyykcninhqn4ht6d6jeqmzq4cepy344akmkhjk75dmw36wq4q",
					"claimsData",
					{}
				);
				console.log(openClaims);
				setOpenClaims(openClaims);
				setIsLoadingOpenClaims(false);
			}
		}
		init();
	}, [textileClient]);

	useEffect(() => {
		fetchAllProposals();
		console.log(openProposalsArray);
	}, []);

	return (
		<Grid
			height='calc(100vh - 64px)'
			px='250px'
			py='20px'
			width='100%'
			templateColumns='3fr 1fr'
			gridGap={5}
			alignItems='flex-start'>
			<Tabs variant='soft-rounded' colorScheme='whatsapp'>
				<TabList justifyContent='space-between'>
					<HStack>
						<Tab>
							Open Claims{" "}
							<GreenTag>{openProposalsArray.length}</GreenTag>
						</Tab>
						<Tab variant='solid'>
							Accepted Claims{" "}
							<GreenTag>{acceptedProposalsArray.length}</GreenTag>
						</Tab>
						<Tab variant='solid'>
							Rejected Claims{" "}
							<GreenTag>{rejectedProposalsArray.length}</GreenTag>
						</Tab>
					</HStack>
					<Link to='/makeClaim'>
						<Button colorScheme='whatsapp'>+ Make a Claim</Button>
					</Link>
				</TabList>
				<TabPanels>
					<TabPanel py={4} px={0}>
						<ClaimsList claims={openProposalsArray} />
					</TabPanel>
					<TabPanel py={4} px={0}>
						<ClaimsList claims={acceptedProposalsArray} />
					</TabPanel>
					<TabPanel py={4} px={0}>
						<ClaimsList claims={rejectedProposalsArray} />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<Stats
				claims={
					acceptedProposalsArray.length +
					rejectedProposalsArray.length
				}
				daoMemberCount={daoMemberCount}
			/>
		</Grid>
	);
}

export default ClaimsPage;
