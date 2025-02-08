import { useEffect } from 'react';
import useUser from 'utils/useUser';
import Main from 'components/Main/Main';
import PostStatusBar from 'components/Posts/PostStatusBar';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import { SnackbarProvider } from "notistack";

const PublicView = dynamic(() => import('./PublicView'), { ssr: false })

const Post = ({ post, updatePost }) => {
  const router = useRouter();
  useEffect(() => {
    if (!post) {
      router.push('/');
    }
  }, [post]);
  const { user } = useUser();
  const showPreview = true;

  if (!post) return null;
  return (
    <Main className="min-[1020px]:pt-[40px] min-[1300px]:pt-[90px] min-[1536px]:w-full min-[1536px]:m-auto min-[1536px]:max-w-[1536px]">
      <SnackbarProvider>
        <PostStatusBar user={user} post={post} updatePost={updatePost} />
        <PublicView {...{ post, user, showPreview }} />
      </SnackbarProvider >
    </Main >
  );
};

export default Post;
