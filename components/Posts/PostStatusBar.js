import TopBar from 'components/TopBar/TopBar';
import { publishEntry, updateEntry } from 'handlers/bll';
import { POST_REVIEW_STATUS, isPostApproved, isUserTeacherOfCourse } from 'utils';

const PostStatusBar = ({ post, user }) => {
    if (isPostApproved(post) || post.course?.professor?.id !== user?.id) {
        return null;
    }

    const submitReview = async (e) => {
        e.preventDefault();
        const { review, monographView, ...postData } = post;
        const entry = await updateEntry({
            review: e.target.id,
            ...postData
        });

        if (entry.error) {
            console.log(entry.error);
        } else {
            await publishEntry(entry.id);
            location.href = '/profile/me';
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
                    children='Aprobar' />

                <button
                    id={POST_REVIEW_STATUS.DENIED}
                    type='button'
                    onClick={submitReview}
                    className={`${styles.btn} ${styles.btnDenied}`}
                    children='Denegar' />
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