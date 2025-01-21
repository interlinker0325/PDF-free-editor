import React, {useState} from "react";
import {GET_ALL_ENTRIES, request} from "utils/graphqlRequest";
import Main from "components/Main/Main";
import HeroCards from "components/HeroCards/HeroCards";
import PostCard from "components/PostCard/PostCard";
import useUser from "utils/useUser";
import {query} from "gql";
import TopBar from "components/TopBar/TopBar";

// Shadocn IU
import { Button } from "@/components/ui/button"

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
        {/* {user.isLoggedIn && (
          <TopBar className="[all:unset] justify-end">
            <h3 className="text-primary text-2xl self-center justify-self-end">
              ¡Bienvenid@ {user.fullname}!
            </h3>
          </TopBar>
        )} */}
        <HeroCards bannerGroups={banners} />
        <div className="flex  overflow-hidden p-[21px] flex-row items-center justify-between pt-10 pb-2">
          <h2 className="col-span-4 leading-tight font-semibold max-[500px]:text-[25px] text-3xl">Publicaciones recientes</h2>
          {state.showMore && (
            <Button
              onClick={getNextPage}
              className="max-[500px]:max-w-[130px] h-[40px] max-[500px]:text-[10px] max-w-[200px] max-md:ml-[13px] lg:ml-[32px] ml-[35px]"
            >
              Cargar más publicaciones
            </Button>
          )}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(229px,1fr))] gap-[20px] p-[15px] card-items-separator">
          {state.posts &&
            state.posts.map((post) => (
              <PostCard key={`Post-Home-${post.id}`} {...post} />
            ))}
        </div>
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
