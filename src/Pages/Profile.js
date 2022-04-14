import {
	Heading,
	VStack,
	Box,
	Spacer,
	HStack,
	Avatar,
	Tabs,
	Tab,
	TabPanel,
	TabList,
	Tag,
	Grid,
	Table,
	Tr,
	Th,
	TabPanels,
	Tbody,
} from "@chakra-ui/react";
import Jazzicon from "../Components/Jazzicon";
import Card from "../Components/Card";
import { Web3Context } from "../utils/Web3Context";
import { useContext, useEffect, useState } from "react";

function Profile() {
	const web3Context = useContext(Web3Context);
	const {
		signerAddress,
		userDaoTokenBalance,
		fetchProposals,
		fetchVotedProposals,
		proposalsArray,
		votedProposalsArray,
	} = web3Context;

	const [daoTokenBalance, setDaoTokenBalance] = useState(0);
	const [stable, setStable] = useState(false);

	useEffect(() => {
		setInterval(async () => {
			setDaoTokenBalance(await userDaoTokenBalance());
		}, 10000);
	}, []);

	useEffect(() => {
		fetchProposals();
		fetchVotedProposals();
	}, [stable]);

	function con() {
		console.log(proposalsArray);
	}

	return (
		<VStack
			alignItems='flex-start'
			height='calc(100vh - 64px)'
			px='250px'
			py='20px'
			width='100%'>
			<HStack width='100%' alignItems='flex-start'>
				<Box
					borderWidth='2px'
					borderRadius='full'
					borderColor='whatsapp.500'
					padding='2px'>
					<Avatar
						size='md'
						icon={
							<Jazzicon
								diameter='48'
								address={`${signerAddress}`}
							/>
						}
					/>
				</Box>
				<VStack alignItems='flex-start'>
					<Heading fontSize='20px'>{signerAddress}</Heading>
					<Tag>10DAIx / month</Tag>
				</VStack>
				<Spacer />
				<VStack>
					<Tag>INSURE Tokens : {daoTokenBalance}</Tag>
				</VStack>
			</HStack>
			<Grid
				width='100%'
				mt='30px !important'
				templateColumns='3fr 2fr'
				gridGap={5}
				alignItems='flex-start'>
				<Tabs
					colorScheme='whatsapp'
					variant='soft-rounded'
					width='100%'>
					<TabList>
						<Tab onClick={con}>
							Claims{" "}
							<Tag ml={2} borderRadius='20px'>
								{proposalsArray.length}
							</Tag>
						</Tab>
						<Tab>
							Voted For
							<Tag ml={2} borderRadius='20px'>
								{votedProposalsArray.length}
							</Tag>
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel mt={3} padding={0}>
							<Card cardTitle='Claims'>
								<Table>
									<Tbody>
										{proposalsArray.map(function (
											element,
											id
										) {
											return (
												<Tr key={id}>
													<Th>
														{" "}
														{element[0].toNumber()}{" "}
													</Th>
													<Th>{element[2]}</Th>
													<Th>
														{element[7] ? (
															<span>
																{" "}
																Passed{" "}
															</span>
														) : (
															<span>
																{" "}
																Failed{" "}
															</span>
														)}
													</Th>
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</Card>
						</TabPanel>
						<TabPanel mt={3} padding={0}>
							<Card cardTitle='Claims'>
								<Table>
									<Tbody>
										{votedProposalsArray.map(function (
											element,
											id
										) {
											return (
												<Tr key={id}>
													<Th>
														{" "}
														{element[0].toNumber()}{" "}
													</Th>
													<Th>{element[2]}</Th>
													<Th>
														{element[7] ? (
															<span>
																{" "}
																Passed{" "}
															</span>
														) : (
															<span>
																{" "}
																Failed{" "}
															</span>
														)}
													</Th>
												</Tr>
											);
										})}
									</Tbody>
								</Table>
							</Card>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Grid>
		</VStack>
	);
}

export default Profile;
