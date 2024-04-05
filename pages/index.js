import React, { useState } from "react";
import { request, GET_ALL_ENTRIES, GET_ALL_ADS } from "utils/graphqlRequest";
import Main from "components/Main/Main";
import HeroCards from "components/HeroCards/HeroCards";
import PostCard from "components/PostCard/PostCard";
import useUser from "utils/useUser";
import { query } from "gql";
import TopBar from "components/TopBar/TopBar";

const Home = ({ posts, showMore, currentPage, banners, ...props }) => {
  const { user = {} } = useUser();
  const [state, setState] = useState({
    showMore: showMore,
    currentPage,
    posts,
  });

  const getNextPage = async () => {
    const nextPage = state.currentPage + 1;
    const { allPosts } = await request([GET_ALL_ENTRIES(nextPage)]);
    const showMore = !(allPosts.length < 8);

    setState({
      showMore,
      currentPage: nextPage,
      posts: [...state.posts, ...allPosts],
    });
  };

  return (
    <>
	
      <Main>
        {user.isLoggedIn && (
          <TopBar className="justify-end">
            <h3 className="text-primary text-2xl self-center justify-self-end">
              ¡Bienvenid@ {user.fullname}!
            </h3>
          </TopBar>
        )}
        <HeroCards bannerGroups={banners} />
        <div className="flex flex-row items-center justify-between pt-20 pb-2 border-[1px] border-transparent rounded-none border-b-black">
          <h2 className="col-span-4 text-3xl">Publicaciones recientes</h2>
        </div>
        <div className="my-8 grid grid-cols-5 gap-6">
          {state.posts &&
            state.posts.map((post) => (
              <PostCard key={`Post-Home-${post.id}`} {...post} />
            ))}
        </div>
        {state.showMore && (
          <a
            onClick={getNextPage}
            className="text-other cursor-pointer hover:text-primary underline underline-offset-1 mt-4 mb-20"
          >
            Cargar más publicaciones &gt;
          </a>
        )}
      </Main>
    </>
  );
};

export async function getServerSideProps() {
  const CURRENT_PAGE = 1;
  const { allPosts, allBanners } = await request([
    GET_ALL_ENTRIES(CURRENT_PAGE),
    query.banners.GET_ACTIVE_BANNERS,
  ]);

  let banners = [];
  for (let i = 0; i < allBanners.length; i += 3)
    banners.push(allBanners.slice(i, i + 3));
  return {
    props: {
      currentPage: CURRENT_PAGE,
      posts: allPosts,
      banners: banners,
      showMore: !(allPosts.length < 10),
    },
  };
}

export default Home;
