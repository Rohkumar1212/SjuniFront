
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import Usa from 'assets/img/dashboards/india.png';
// Custom components
import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import { Md10K, MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy, MdQueue, MdRssFeed, MdRsvp } from 'react-icons/md';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import '../default/default.css';

export default function UserReports() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<div className='col-md-12'>
				<div className='dashboard'>
				<MiniStatistics
					startContent={
						<IconBox
							w='46px'
							h='46px'
							bg={boxBg}
							icon={<Icon w='30px' h='28px' as={MdBarChart} color={brandColor} />}
						/>
					}
					name='Earnings'
					value='111350.4'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='46px'
							h='46px'
							bg={boxBg}
							icon={<Icon w='30px' h='28px' as={MdBarChart}  color={brandColor} />}
						/>
					}
					name='Spend this month'
					value='₹11642.39'
				/>
				<MiniStatistics growth='+23%' name='Sales' value='12574.34' />
				<MiniStatistics
					endContent={
						<Flex me='-16px' mt='10px'>
							<FormLabel htmlFor='balance'>
								<Avatar src={Usa} />
							</FormLabel>
							{/* <Select id='balance' variant='mini' mt='5px' me='0px' defaultValue='usd'>
								<option value='usd'>USD</option>
								<option value='eur'>EUR</option>
								<option value='gba'>GBA</option>
							</Select> */}
						</Flex>
					}
					name='Your balance'
					value='1,000'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
							icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
						/>
					}
					name='New Tasks'
					value='54'
				/>
				<MiniStatistics
					startContent={
						<IconBox
							w='56px'
							h='56px'
							bg={boxBg}
							icon={<Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />}
						/>
					}
					name='Total Marksheet'
					value='5'
				/>
			</div>
			</div>
			<div>
				<TotalSpent />
				<WeeklyRevenue />
			</div>
			<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
				{/* <CheckTable tableData={tableDataCheck} /> */}
				<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px'>
					{/* <DailyTraffic /> */}
					<PieCard />
				</SimpleGrid>
			</SimpleGrid>
		
		</Box>
	);
}
