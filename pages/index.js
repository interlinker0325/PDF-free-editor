import React, {useEffect, useState} from "react";
import {GET_ALL_ENTRIES, request} from "utils/graphqlRequest";
import Main from "components/Main/Main";
import HeroCards from "components/HeroCards/HeroCards";
import PostCard from "components/PostCard/PostCard";
import useUser from "utils/useUser";
import {query} from "gql";

const POST_PAGE_SIZE = 24;

// Shadocn IU
import {Button} from "@/components/ui/button"

const Home = ({posts, showMore, currentPage, banners}) => {
  useUser();
  const [state, setState] = useState({});

  const getNextPage = async () => {
    const nextPage = state.currentPage + 1;
    const {allPosts} = await request([GET_ALL_ENTRIES(nextPage)]);
    const showMore = allPosts.length > POST_PAGE_SIZE

    setState({
      showMore,
      currentPage: nextPage,
      posts: [...state.posts, ...allPosts],
    });
  };

  useEffect(() => {
    setState({
      showMore: showMore,
      currentPage,
      posts,
    })
  }, [showMore, currentPage, posts]);

  return (
      <>
        <Main className="min-[1500px]:m-auto min-[1500px]:max-w-[1500px] min-[1500px]:p-20">
          <HeroCards bannerGroups={banners}/>
          <div className="flex  overflow-hidden p-[21px] flex-row items-center justify-between pt-10 pb-2">
            <h2 className="col-span-4 leading-tight font-semibold max-[500px]:text-[25px] text-3xl">Publicaciones
              recientes</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(229px,1fr))] gap-[20px] p-[15px] card-items-separator">
            {(state?.posts || []).map((post) => (
                <PostCard key={`Post-Home-${post.id}`} {...post} />
            ))}
          </div>
          <div>
            {state.showMore && (
                <Button
                    onClick={getNextPage}
                    variant="link"
                    className="text-black underline decoration-1 max-[500px]:max-w-[130px] h-[40px] max-[500px]:text-[10px] max-w-[200px] "
                >
                  Cargar más publicaciones
                </Button>
            )}
          </div>
        </Main>
      </>
  );
};

export async function getServerSideProps() {
  const CURRENT_PAGE = 1;
  const {allPosts, allBanners} = await request([
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
      showMore: allPosts.length > POST_PAGE_SIZE,
    },
  };
}

export default Home;
