import { VStack, Text, Heading } from "@chakra-ui/react";
import { useCountUp } from "react-countup";

function Stats(props) {
	return (
		<VStack width='100%'>
			<VStack
				borderColor='whatsapp.500'
				borderStyle='solid'
				borderWidth='1px'
				alignItems='flex-start'
				px='20px'
				py='15px'
				width='100%'
				boxShadow='base'
				borderRadius='10px'>
				<Text fontWeight='600'>Treasury Funds</Text>
				<Heading fontSize='24px' textColor='whatsapp.500'>
					50 DAI
				</Heading>
			</VStack>
			<VStack
				borderColor='whatsapp.500'
				borderStyle='solid'
				borderWidth='1px'
				alignItems='flex-start'
				px='20px'
				py='15px'
				width='100%'
				boxShadow='base'
				borderRadius='10px'>
				<Text fontWeight='600'>Total Claims</Text>
				<Heading fontSize='24px' textColor='whatsapp.500'>
					{props.claims}
				</Heading>
			</VStack>
			<VStack
				borderColor='whatsapp.500'
				borderStyle='solid'
				borderWidth='1px'
				alignItems='flex-start'
				px='20px'
				py='15px'
				width='100%'
				boxShadow='base'
				borderRadius='10px'>
				<Text fontWeight='600'>DAO Members</Text>
				<Heading fontSize='24px' textColor='whatsapp.500'>
					{props.daoMemberCount}
				</Heading>
			</VStack>
		</VStack>
	);
}

export default Stats;
