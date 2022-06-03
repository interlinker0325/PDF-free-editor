import { useState } from 'react';
import { request, GET_ALL_ENTRIES, GET_ALL_ADS } from 'utils/graphqlRequest';
import Layout from 'components/Layout/Layout';
import Box from 'components/Box/Box';
import Thumbnail from 'components/Thumbnail/Thumbnail';
import Text from 'components/Text/Text';
import Link from 'components/Link/Link';
import { fonts } from 'styles/theme';

const Home = ({ contentData, currentPage, ...props }) => {
	const [state, setState] = useState({
		showMore: true,
		currentPage,
		...contentData,
	})

	const getNextPage = async () => {
		const nextPage = state.currentPage + 1;
		const { allEntries } = await request(GET_ALL_ENTRIES(false, nextPage));
		const showMore = !(allEntries.length < 11);


		if (showMore) {
			const { allAdvertisements } = await request(GET_ALL_ADS(nextPage));
			allEntries.splice(1, 0, { ...allAdvertisements[0], isAd: true });
		}

		setState({
			showMore,
			currentPage: nextPage,
			posts: [...state.posts, ...allEntries],
			alerts: state.alerts
		})
	};

	return (
		<Layout
			{...props}
			content={{
				main: (
					<>
						{!!state.alerts?.length &&
							<Box
								as='section'
								display='grid'
								gridTemplateColumns='1fr 1fr 1fr'
								gridColumnGap='5'
								pb='4'>
								{state.alerts.map((item, index) =>
									<Thumbnail
										key={`Alert_${index}`}
										id={item.id}
										isAlert={true}
										title={item.title}
										description={item.description} />
								)}
							</Box>
						}

						<Text
							as='h2'
							fontSize='3'
							py='0'
							borderBottom='1px solid black'
							width='100%'>
							Contenido reciente
						</Text>

						{!!state.posts?.length &&
							<Box
								as='section'
								display='grid'
								gridTemplateColumns='repeat(4, 1fr)'
								gridAutoRows='auto'
								gridGap='4'
								py='4'>
								{state.posts.map((item, index) =>
									<Thumbnail
										key={`Post_${index}`}
										isAd={item.isAd}
										targetUrl={item.url}
										id={item.id}
										imgSrc={item.isAd ? item.image?.url : item.coverimage?.url}
										title={item.isAd ? item.name : item.title}
										description={item.description} />
								)}
							</Box>
						}

						{state.showMore &&
							<Link
								onClick={getNextPage}
								width='fit-content'
								fontFamily={fonts.bigCaslon}
								variant={['underline', 'primary']}
								children='Cargar más contenido >' />
						}
					</>
				)
			}} />
	);
}

export async function getServerSideProps() {
	const CURRENT_PAGE = 1;
	const { allEntries } = await request(GET_ALL_ENTRIES(false, CURRENT_PAGE));
	const { allEntries: allAlerts } = await request(GET_ALL_ENTRIES(true, CURRENT_PAGE, 3));
	const { allAdvertisements } = await request(GET_ALL_ADS(CURRENT_PAGE));

	allEntries.splice(2, 0, { ...allAdvertisements[0], isAd: true });

	return {
		props: {
			currentPage: CURRENT_PAGE,
			contentData: {
				posts: allEntries,
				alerts: allAlerts
			}
		}
	};
}

export default Home;
