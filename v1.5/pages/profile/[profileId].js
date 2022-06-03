import React, { useState, useEffect, useRef } from 'react';
// import { request, GET_ENTRY_BY_ID, GET_COURSE } from 'utils/graphqlRequest';
import { useRouter } from 'next/router';

const CURRENT_USER_PROFILE_ID = 'me'

const Profile = (props) => {
    const { query: { profileId } } = useRouter();
    const mainRef = useRef();
    const isCurrentUserProfile = profileId === CURRENT_USER_PROFILE_ID;

    console.log('OVER HERE!!!', profileId, isCurrentUserProfile);
    return (
        <>Hello</>
        // <Post {...props} />
    );
}

// export async function getServerSideProps({ params: { postId } }) {
//     let { entry, course } = await request([GET_ENTRY_BY_ID(postId), GET_COURSE]);

//     if (entry?.content?.length) {
//         for (let i = 0; i < entry.content.length; i++) {
//             if (entry.content[i].monograph) {
//                 let c = entry.content[i];
//                 c.monograph = await getHTML(c.monograph?.url);
//                 c.ref = React.createRef();
//                 entry.content[i] = c
//             }
//         }
//     }

//     console.log('OVER HERE!!!', entry, course);
//     return {
//         props: { entry, course }
//     };
// }

export default Profile;
