import React, { useState } from 'react';
import { request, GET_ALL_ENTRIES, GET_ALL_ADS } from 'utils/graphqlRequest';
import Main from 'components/Main/Main';
import HeroCards from 'components/HeroCards/HeroCards';
import PostCard from 'components/PostCard/PostCard';
import useUser from 'utils/useUser';

const Home = ({ contentData, currentPage, ...props }) => {
	const { user = {} } = useUser();
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

	console.log('OVER HERE POSTS!', state.posts);
    return (
        <Main>
			{user.isLoggedIn &&
				<h3 className='text-primary self-end pb-4'>Bienvenid@ {user.name} {user.lastname}</h3>
			}
			<HeroCards />
            <div className="my-8 grid grid-cols-4 gap-4">
                {state.posts && state.posts.map(post =>
                    <PostCard key={`Post-Home-${post.id}`} {...post} />
                )}
            </div>
        </Main>
    );
}

export async function getServerSideProps() {
	const CURRENT_PAGE = 1;
	const { allEntries } = await request(GET_ALL_ENTRIES(false, CURRENT_PAGE));
	// const { allEntries: allAlerts } = await request(GET_ALL_ENTRIES(true, CURRENT_PAGE, 3));

	return {
		props: {
			currentPage: CURRENT_PAGE,
			contentData: {
				posts: allEntries,
				// alerts: allAlerts
			}
		}
	};
}

export default Home;
