import {useState} from 'react';
import TopBar from 'components/TopBar/TopBar';
import {updateEntry} from 'handlers/bll';
import {isPostApproved, POST_REVIEW_STATUS} from 'utils';

import {useRouter} from "next/router";
import {useSnackbar} from "notistack";

const errorConfig = {
  variant: 'error',
  anchorOrigin: {
   vertical: 'top',
    horizontal: 'center'
  }
}

const PostStatusBar = ({post, user}) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  if (!post?.course || !user) return null;
  if (isPostApproved(post) || post.course?.professor?.id !== user?.id) {
    return null;
  }

  const submitReview = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const entry = await updateEntry({
        review: e.target.id,
        id: post.id,
      });

      if (entry.error) {
        console.log(entry.error);
        enqueueSnackbar('No se pudo actualizar la publicación', errorConfig);
      } else {
        enqueueSnackbar('EL documento ha sido ' + e.target.id === POST_REVIEW_STATUS.APPROVED ? "aprobado" : "denegado", {
          variant: 'success',
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
    <TopBar>
      <a className={styles.link} href='/profile/me'>{'< Volver a archivo'}</a>
      <div>
        <button
          id={POST_REVIEW_STATUS.APPROVED}
          type='button'
          onClick={submitReview}
          className={`${styles.btn} ${styles.btnApproved}`}
          disabled={loading}
          children='Aprobar'
        />
        <button
          id={POST_REVIEW_STATUS.DENIED}
          type='button'
          onClick={submitReview}
          className={`${styles.btn} ${styles.btnDenied}`}
          disabled={loading}
          children='Denegar'
        />
      </div>
    </TopBar>
  );
};

const styles = {
  btn: 'btn text-white rounded-full btn-sm text-xl capitalize px-5 py-[2px]',
  btnApproved: 'btn-success mr-1 hover:bg-lightSuccess',
  btnDenied: 'btn-error ml-1 hover:bg-lightError',
  link: 'text-other cursor-pointer hover:text-primary underline underline-offset-1'
};

export default PostStatusBar;
