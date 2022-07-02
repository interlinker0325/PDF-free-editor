import { publishEntry, updateEntry } from 'handlers/bll';
import { POST_REVIEW_STATUS, isPostApproved, isUserTeacherOfCourse } from 'utils';

const PostStatusBar = ({ post, user }) => {
    if (isPostApproved(post) || post.course?.professor?.id !== user?.id) {
        return null;
    }

    const submitReview = async (e) => {
        e.preventDefault();

        const { review, author, coverimage, course, attachments, ...postData } = post;
        postData.author = author.id;
        postData.coverimage = coverimage.id;
        postData.course = course.id;
        postData.attachments = attachments.map(file => file.id);

        const entry = await updateEntry(post.id, {
            review: e.target.id,
            ...postData
        });

        if (entry.error) {
            console.log(entry.error);
        } else {
            await publishEntry(entry.id);
            location.reload();
        }
    };

    return (
        <div className={styles.bar}>
            <a className={styles.link} href={`/posts/${post.id}`}>{'< Volver a archivo'}</a>
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
        </div>
    );
};

const styles = {
    bar: 'bg-neutral w-full flex flex-row justify-between items-center h-[47px] px-16 mt-[-48px] mx-[-56px] w-screen mb-5',
    btn: 'btn text-white rounded-full btn-sm text-xl capitalize px-5 py-[2px]',
    btnApproved: 'btn-success mr-1',
    btnDenied: 'btn-error ml-1',
    link: 'text-other cursor-pointer hover:text-primary underline underline-offset-1'
};

export default PostStatusBar;