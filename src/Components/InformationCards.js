import {
	VStack,
	Text,
	Spacer,
	HStack,
	Progress,
	Image,
	Avatar,
	Tag,
	Skeleton,
	Spinner,
	SkeletonCircle,
} from "@chakra-ui/react";
import Card from "./Card";
import ChainlinkCard from "./ChainlinkCard";
import { FaExternalLinkAlt } from "react-icons/fa";
import Jazzicon from "./Jazzicon";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReadTransaction } from "@textile/hub";

function InformationCards({
	author,
	loadingClaim,
	dateOfIncident,
	ipfsHash,
	yesVotes,
	noVotes,
	rainData,
	memberData,
}) {
	const voters = [""];

	const [openWeatherStats, setOpenWeatherStats] = useState();

	useEffect(() => {
		async function init() {
			let response = await axios.get(
				"https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=32.21&lon=76.32&exclude=minutely,hourly&appid=162ac7d2a16586444f5b2e968f020e4c&dt=1628319601"
			);
			setOpenWeatherStats(response.data.hourly);
		}
		init();
	}, []);

	return (
		<VStack spacing={5}>
			<Card cardTitle='Information'>
				<HStack width='100%'>
					<Text fontWeight='600'>Author</Text>
					<Spacer />
					{loadingClaim ? (
						<Skeleton isLoaded={!loadingClaim}>Author</Skeleton>
					) : (
						<Text>{`${author.substr(0, 7)}...${author.substr(
							-7
						)}`}</Text>
					)}
				</HStack>
				<HStack width='100%'>
					<Text fontWeight='600'>IPFS</Text>
					<Spacer />
					{loadingClaim ? (
						<Skeleton isLoaded={!loadingClaim}>IPFS hash</Skeleton>
					) : (
						<HStack>
							<a
								href={`https://ipfs.io/ipfs/` + ipfsHash}
								target='_blank'>
								<Text>
									{" "}
									{`${ipfsHash.substr(
										0,
										7
									)}...${ipfsHash.substr(-7)}`}{" "}
								</Text>

								<FaExternalLinkAlt size='10px' />
							</a>
						</HStack>
					)}
				</HStack>
				<HStack width='100%'>
					<Text fontWeight='600'>Member location</Text>
					<Spacer />
					{loadingClaim ? (
						<Skeleton isLoaded={!loadingClaim}>Author</Skeleton>
					) : (
						<a
							target='_blank'
							href={
								`https://www.google.co.in/maps/@` +
								memberData.lat +
								`,` +
								memberData.long
							}>
							Map
						</a>
					)}
				</HStack>
			</Card>
			<Card cardTitle='Time'>
				<VStack width='100%'>
					<HStack width='100%'>
						<Text fontWeight='600'>Date Of Incident</Text>
						<Spacer />
						{loadingClaim ? (
							<Skeleton isLoaded={!loadingClaim}>
								Date Of Incident
							</Skeleton>
						) : (
							<HStack>
								<Text>{dateOfIncident}</Text>
							</HStack>
						)}
					</HStack>
				</VStack>
			</Card>
			<ChainlinkCard cardTitle=''>
				<VStack width='100%'>
					<HStack width='100%'>
						<Text fontWeight='600'>Rain data : </Text>
						<Text fontWeight='600'>{rainData} mm</Text>

						<Spacer />
					</HStack>
				</VStack>
			</ChainlinkCard>
			<Card cardTitle='Current Results'>
				<VStack width='100%'>
					<HStack width='100%'>
						<Text fontWeight='600'>Yes</Text>
						<Spacer />
						{loadingClaim ? (
							<Skeleton>vote percent</Skeleton>
						) : (
							<Text fontWeight='600'>
								{(yesVotes / (yesVotes + noVotes)) * 100
									? (yesVotes / (yesVotes + noVotes)) * 100
									: "0"}
								%
							</Text>
						)}
					</HStack>
					<Progress
						width='100%'
						borderRadius='20px'
						background='gray.300'
						height='10px'
						value={
							loadingClaim
								? 0
								: (yesVotes / (yesVotes + noVotes)) * 100
						}
						colorScheme='green'
						size='lg'
					/>
					<HStack width='100%'>
						<Text fontWeight='600'>No</Text>
						<Spacer />
						{loadingClaim ? (
							<Skeleton>vote percent</Skeleton>
						) : (
							<Text fontWeight='600'>
								{(noVotes / (yesVotes + noVotes)) * 100
									? (noVotes / (yesVotes + noVotes)) * 100
									: "0"}
								%
							</Text>
						)}
					</HStack>
					<Progress
						width='100%'
						borderRadius='20px'
						background='gray.300'
						height='10px'
						value={
							loadingClaim ? 0 : noVotes / (yesVotes + noVotes)
						}
						colorScheme='green'
						size='lg'
					/>
				</VStack>
			</Card>
			<Card cardTitle='OpenWeather Analysis'>
				{openWeatherStats ? (
					<>
						{openWeatherStats.map((stat) => {
							return (
								<HStack width='100%'>
									<Text>
										{new Date(parseInt(stat.dt) * 1000)
											.toTimeString()
											.substr(0, 5)}
									</Text>
									<Text>
										{stat.weather[0].description[0].toUpperCase() +
											stat.weather[0].description.substr(
												1
											)}
									</Text>
									<Spacer />
									<Image
										src={`http://openweathermap.org/img/wn/${stat.weather[0].icon}.png`}
									/>
								</HStack>
							);
						})}
					</>
				) : (
					<Spinner margin='auto' />
				)}
			</Card>

			<Card cardTitle='Votes'>
				<VStack width='100%' alignItems='flex-start'>
					{loadingClaim ? (
						<HStack justifyContent='space-between' width='100%'>
							<HStack>
								<SkeletonCircle />
								<Skeleton>Address that voted</Skeleton>
							</HStack>
							<Skeleton>Vote</Skeleton>
							<Skeleton>Voting Power</Skeleton>
						</HStack>
					) : (
						<>
							{voters.map((voter) => {
								return (
									<HStack
										justifyContent='space-between'
										width='100%'
										key={0}>
										<HStack>
											<Avatar
												size='xs'
												icon={
													<Jazzicon
														diameter='24'
														address='0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69'
													/>
												}
											/>
											<Tag>{`${"0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69".substr(
												0,
												6
											)}...${"0x8Cf24E66d1DC40345B1bf97219856C8140Ce6c69".substr(
												-5
											)}`}</Tag>
										</HStack>
										<Tag colorScheme='whatsapp'>Yes</Tag>
										<Text>300 DIx</Text>
									</HStack>
								);
							})}
						</>
					)}
				</VStack>
			</Card>
		</VStack>
	);
}

export default InformationCards;
