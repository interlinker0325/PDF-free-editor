import {useState} from 'react';
import TopBar from 'components/TopBar/TopBar';
import {updateEntry} from 'handlers/bll';
import {isPostApproved, POST_REVIEW_STATUS} from 'utils';
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {Button} from "@/components/ui/button";
import {Loader2} from 'lucide-react';

const errorConfig = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center'
  }
}

const PostStatusBar = ({post, user}) => {
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const router = useRouter();

  if (!post?.course || !user) return null;

  const isTheProfessor = post.course?.professor?.id === user?.id;
  if (isPostApproved(post) || !isTheProfessor) return null;

  const submitReview = async (review) => {
    try {
      setLoading(true);

      const entry = await updateEntry({
        review,
        id: post.id,
      });

      if (entry.error) {
        console.log(entry.error);
        enqueueSnackbar('No se pudo actualizar la publicación', errorConfig);
      } else {
        const approved = review === POST_REVIEW_STATUS.APPROVED;
        enqueueSnackbar('El documento ha sido ' + (approved ? "aprobado" : "denegado"), {
          variant: approved ? 'success' : 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }
        });
        await router.push('/profile/me');
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Ocurrió un error durante el proceso', errorConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
      <TopBar marginTop={"mt-1"}>
        <a className="text-other cursor-pointer hover:text-primary underline underline-offset-1"
           href='/profile/me'>{'< Volver a archivo'}</a>
        <div className="flex gap-2">
          <Button
              onClick={async (e) => {
                e.preventDefault();
                await submitReview(POST_REVIEW_STATUS.APPROVED);
              }}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
            Aprobar
          </Button>
          <Button
              onClick={async (e) => {
                e.preventDefault();
                await submitReview(POST_REVIEW_STATUS.DENIED);
              }}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
            Denegar
          </Button>
        </div>
      </TopBar>
  );
};

export default PostStatusBar;
