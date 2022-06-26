import React, { useState, useEffect, useRef } from 'react';
import withSession from 'utils/withSession';
import { request } from 'utils/graphqlRequest';
import { query } from 'gql';
import Main from 'components/Main/Main';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import UserInfo from 'components/Profile/UserInfo';
import Courses from 'components/Profile/Courses';
import Publications from 'components/Profile/Publications';
import EditProfile from 'components/Profile/EditProfile';

import * as userUtils from 'utils/user';


const CURRENT_USER_PROFILE_ID = 'me'

const VIEW_STATES = {
    USER: 'userInfo',
    COURSE: 'courses',
    POSTS: 'posts',
    EDIT: 'editProfile',
    ARCHIVE: 'ARCHIVE'
}

const Profile = ({ profile, courses, posts, archivePosts, isProfessor }) => {
    const [activeView, setActiveView] = useState(VIEW_STATES.USER);
    const { query: { profileId } } = useRouter();
    const mainRef = useRef();
    const isCurrentUserProfile = profileId === CURRENT_USER_PROFILE_ID;



    // console.log('OVER HERE!!!', archivePosts, isCurrentUserProfile, profile, isProfessor, posts);
    return (
        <Main>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.avatarCard}>
                        <FontAwesomeIcon className='py- min-w-fit text-2xl' icon={faCircleUser} />
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.tabs}>
                        <div>
                            <a
                                className={activeView === VIEW_STATES.USER ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.USER)}>
                                Data personal
                            </a>
                            <a
                                className={activeView === VIEW_STATES.COURSE ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.COURSE)}>
                                Cursos
                            </a>
                            <a
                                className={activeView === VIEW_STATES.POSTS ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.POSTS)}>
                                Publicaciones
                            </a>
                            {(isProfessor && isCurrentUserProfile) &&
                                <a
                                    className={activeView === VIEW_STATES.ARCHIVE ? styles.activeTab : styles.tabItem}
                                    onClick={() => setActiveView(VIEW_STATES.ARCHIVE)}>
                                    Archivo
                                </a>
                            }
                        </div>
                        {isCurrentUserProfile &&
                            <a
                                className={activeView === VIEW_STATES.EDIT ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.EDIT)}>
                                Editar Perfil >
                            </a>
                        }
                    </div>
                    <div className={styles.tabContent}>
                        {activeView === VIEW_STATES.USER &&
                            <UserInfo
                                name={profile.name}
                                lastname={profile.lastname}
                                email={profile.email}
                                genero={profile.genero}
                                phone={profile.phone}
                                birthdate={profile.birthdate}
                                residencia={profile.residencia}
                                nivel={profile.nivel}
                                experiencia={profile.experiencia} />
                        }
                        {activeView === VIEW_STATES.COURSE &&
                            <Courses items={courses} />
                        }
                        {activeView === VIEW_STATES.POSTS &&
                            <Publications items={posts} />
                        }
                        {activeView === VIEW_STATES.ARCHIVE &&
                            <Publications items={archivePosts} />
                        }
                        {activeView === VIEW_STATES.EDIT &&
                            <EditProfile />
                        }
                    </div>
                </div>
            </div>
        </Main>
    );
}

const styles = {
    mainContainer: 'my-8 grid grid-cols-4 gap-8',
    leftContainer: '',
    rightContainer: 'col-span-3 flex flex-col gap-4',
    avatarCard: 'card text-gray-400 bg-secondary rounded-none h-60',
    tabs: 'tabs border-transparent border-b-black border-b-2 w-full justify-between',
    tabItem: 'tab pl-0',
    activeTab: 'tab tab-active text-primary pl-0',
    tabContent: 'border-b-black border-b-2 pb-4'
};

export const getServerSideProps = withSession(async function ({ req, res }) {
    const currentUser = req.session.get('user') || {};
    const urlSplit = req.url.split('/');
    const userIdParam = urlSplit[urlSplit.length - 1];
    const isCurrentUserProfile = userIdParam === CURRENT_USER_PROFILE_ID && currentUser;
    const isProfessor = userUtils.isProfessor(currentUser.tipo?.id);
    const profileId = isCurrentUserProfile ? currentUser.id : userIdParam
    const profileQuery = isCurrentUserProfile ?
        query.user.GET_PRIVATE_USER_PROFILE : query.user.GET_PUBLIC_USER_PROFILE;

    const { user: profile, allCourses, allEntries: posts } = await request([
        profileQuery(profileId),
        (isProfessor && isCurrentUserProfile) ?
            query.user.GET_PROFESOR_COURSES(profileId) : query.user.GET_USER_COURSES(profileId),
        query.user.GET_USER_POSTS(profileId),
    ]);

    let archivePosts = {};
    if (isProfessor && isCurrentUserProfile) {
        const profesorCourses = allCourses.map(course => course.id);
        // console.log('OVER HERE SADSA!!', profesorCourses);
        archivePosts = await request(
            query.posts.GET_PROFESOR_COURSES_POSTS(profesorCourses)
        );
    }

    return {
        props: {
            profile,
            courses: allCourses,
            posts: posts,
            archivePosts: archivePosts.allEntries || [],
            isProfessor
        }
    };
});

export default Profile;
