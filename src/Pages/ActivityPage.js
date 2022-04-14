import {
	Heading,
	Grid,
	Box,
	HStack,
	VStack,
	Thead,
	Tr,
	Th,
	Table,
	Tbody,
	Td,
	Text,
	Spinner,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { useState, useEffect } from "react";
import Web3 from "web3";
import GreenTag from "../Components/GreenTag";

const web3 = new Web3();

function MyResponsivePie({ data }) {
	return (
		<ResponsivePie
			data={data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			innerRadius='0.5'
			cornerRadius='3'
			borderWidth='2'
			arcLinkLabel={(d) => `${d.id.substr(0, 5)}...${d.id.substr(-5)}`}
			arcLinkLabelsColor={{ from: "color" }}
			borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
			arcLabelsRadiusOffset={0.55}
			activeOuterRadiusOffset={8}
			padAngle={1}
		/>
	);
}

function ActivityPage() {
	const [data, setData] = useState();

	const [loadingData, setLoadingData] = useState();
	useEffect(() => {
		async function init() {
			setLoadingData(true);
			// querying superfluid subgraph to create pie diagram of flow towards DAO Contract
			const response = await axios.post(
				"https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-mumbai",
				{
					query: `
                    {
                        flows(where:{ recipient: "0xb77963bfd55f5246068c09a2048fa3ab310e4a17" }) {
                        id
                        flowRate
                        lastUpdate
                            owner {
                                id
                            }
                        }
                    }
                `,
				}
			);

			let datas = [];

			response.data.data.flows.map((flow) => {
				let secondsElapsed =
					Math.floor(Date.now() / 1000) - parseInt(flow.lastUpdate);
				let outFlowed = web3.utils.fromWei(
					web3.utils
						.toBN(flow.flowRate)
						.mul(web3.utils.toBN(secondsElapsed))
						.toString(),
					"ether"
				);
				let obj = {
					id: flow.owner.id,
					label: flow.owner.id,
					value: outFlowed,
					flowRate: web3.utils.toBN(flow.flowRate),
					sumInWei: web3.utils
						.toBN(flow.flowRate)
						.mul(web3.utils.toBN(secondsElapsed)),
				};
				datas.push(obj);
			});
			setData(datas);
			setLoadingData(false);
		}
		init();
	}, [data]);

	useEffect(() => {
		if (data != undefined) {
			setTimeout(() => {
				for (let i = 0; i < data.length; i++) {
					data[i].value = web3.utils
						.fromWei(data[i].sumInWei.add(data[i].flowRate))
						.toString();
					data[i].sumInWei = data[i].sumInWei.add(data[i].flowRate);
				}
				setData(data);
			}, 1000);
		}
	}, [data]);

	return (
		<Grid px='250px' gridGap='10px' py='20px'>
			<Heading fontSize='24px' color='whatsapp.500'>
				Members
			</Heading>
			<Box height='400px'>
				{loadingData ? <Spinner /> : <MyResponsivePie data={data} />}
			</Box>
			<Table>
				<Thead>
					<Tr>
						<Th>Address</Th>
						<Th>outFlowed</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data == undefined ? (
						<Spinner />
					) : (
						<>
							{data.map((data, index) => {
								return (
									<Tr>
										<Td>
											<GreenTag>{data.id}</GreenTag>
										</Td>
										<Td>{data.value}</Td>
									</Tr>
								);
							})}
						</>
					)}
				</Tbody>
			</Table>
		</Grid>
	);
}

export default ActivityPage;
