import {useState, useCallback, useEffect, useRef} from 'react';
import {updateProfile} from 'handlers/profile';
import {upload} from 'handlers/bll';
import withSession from 'utils/withSession';
import {request} from 'utils/graphqlRequest';
import {query} from 'gql';
import Main from 'components/Main/Main';
import {useRouter} from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import UserInfo from 'components/Profile/UserInfo';
import Courses from 'components/Profile/Courses';
import Publications from 'components/Profile/Publications';
import EditProfile from 'components/Profile/EditProfile';
import TopBar from 'components/TopBar/TopBar';
import Loader from 'components/Loader/Loader';
import {verifyMutipleFields, INPUT_TYPES} from 'utils/form';
import useUser from 'utils/useUser';

import {isProfessor as isUserProfessor} from 'utils';

const DEFAULT_USER_ID = 'me'

const VIEW_STATES = {
    USER: 'userInfo',
    COURSE: 'courses',
    POSTS: 'posts',
    EDIT: 'editProfile',
    ARCHIVE: 'ARCHIVE'
}

const DEFAULT_ERRORFORM = {field: null, msg: null};

function Profile({profile, courses, posts, archivePosts, isProfessor}) {
    const {user} = useUser({redirectTo: '/'})
    const router = useRouter();
    useEffect(() => {
        if (!profile) router.push('/');
    }, [profile]);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [formState, setFormState] = useState(profile || {});
    const [errorForm, setErrorForm] = useState(DEFAULT_ERRORFORM);
    const [avatarImage, setAvatarImage] = useState(null);
    const [activeView, setActiveView] = useState(VIEW_STATES.USER);
    const {query: {profileId}} = useRouter();
    const isCurrentUserProfile = profileId === DEFAULT_USER_ID;

    const refs = {
        avatar: useRef()
    };

    const triggerLoading = (show) => {
        if (show) {
            document.getElementsByTagName('body')[0].classList.add('htmlBackgroundBackdrop');
            setShowLoadingScreen(true);
        } else {
            document.getElementsByTagName('body')[0].classList.remove('htmlBackgroundBackdrop');
            setShowLoadingScreen(false);
        }
    }

    const onChange = useCallback(async (e, name) => {
        let itemValue;
        if (refs[name]) {
            triggerLoading(true);
            const _files = refs[name]?.current?.files;
            const files = await upload(_files);
            itemValue = files;
            if (FileReader && _files && _files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    setAvatarImage(fr.result);
                }
                fr.readAsDataURL(_files[0]);
            }
            triggerLoading(false);
        } else {
            if (name === INPUT_TYPES.PHONE) {
                if (/^\d*[.]?\d*$/.test(e.target.value)) {
                    itemValue = e.target.value;
                } else {
                    itemValue = formState[name];
                }
            } else {
                itemValue = e.target.value;
            }
        }
        delete formState[name];
        setFormState({[name]: itemValue, ...formState})
    }, [formState]);

    const submitUpdateProfile = useCallback(async (e) => {
        e.preventDefault();
        triggerLoading(true);
        const {
            id,
            role,
            fullname,
            email,
            phone,
            birthdate,
            gender,
            residence,
            level,
            experience,
        } = formState;

        const fieldsStatus = verifyMutipleFields([
            {field: INPUT_TYPES.FULLNAME, value: fullname, required: true},
            {field: INPUT_TYPES.EMAIL, value: email, required: true},
            {field: INPUT_TYPES.PHONE, value: phone, required: true, length: 8},
            {field: INPUT_TYPES.BIRTHDATE, value: birthdate, required: true},
            {field: INPUT_TYPES.GENDER, value: gender},
            {field: INPUT_TYPES.RESIDENCE, value: residence},
            {field: INPUT_TYPES.LEVEL, value: level},
            {field: INPUT_TYPES.EXPERIENCE, value: experience}
        ]);

        if (fieldsStatus) {
            setErrorForm(fieldsStatus);
            triggerLoading(false);
            return;
        } else {
            setErrorForm(DEFAULT_ERRORFORM);
        }

        const entry = await updateProfile(id, {
            role: role.id,
            fullname,
            email,
            phone,
            birthdate,
            gender,
            residence,
            level,
            experience
        });

        if (entry.error) {
            alert('No se pudo actualizar la entrada');
        } else {
            setFormState({...entry});
        }
        triggerLoading(false);
        setActiveView(VIEW_STATES.USER);
    }, [formState]);

    const doCancel = useCallback(async (e) => {
        setFormState(profile);
        setAvatarImage(null);
        setActiveView(VIEW_STATES.USER);
    }, [formState])

    const avatarView = avatarImage || formState.avatar?.url ? (
        <img htmlFor='avatar' className='h-[300px] w-[300px]' src={avatarImage || formState.avatar.url}/>
    ) : (
        <div htmlFor='avatar' className='h-[300px] w-[300px] flex flex-col justify-center items-center px-8 py-10'>
            <FontAwesomeIcon htmlFor='avatar' className='text-2xl' icon={faCircleUser}/>
        </div>
    );

    const showStatusBar = errorForm.field || (activeView === VIEW_STATES.USER || activeView === VIEW_STATES.EDIT);
    return (
        <Main>
            {showStatusBar &&
                <TopBar>
                    <h4
                        className={`${errorForm.msg ? 'text-error' : 'text-primary'} text-2xl cursor-pointer`}
                        children={errorForm.msg ?
                            errorForm.msg :
                            'Ningun otro(a) usuario(a) puede ver tu fecha de nacimiento'
                        }/>
                </TopBar>
            }
            <div className={`${showStatusBar ? 'mb-8' : 'my-5'} ${styles.mainContainer}`}>
                <div className={styles.leftContainer}>
                    <div className={styles.avatarCard}>
                        {activeView === VIEW_STATES.EDIT ? (
                            <label className='h-[300px] w-full cursor-pointer'>
                                <input
                                    className={styles.fileInput}
                                    type='file'
                                    name='avatar'
                                    id='avatar'
                                    ref={refs.avatar}
                                    onChange={(e) => onChange(e, 'avatar')}/>
                                {avatarView}
                            </label>
                        ) : avatarView}
                    </div>
                    {activeView === VIEW_STATES.EDIT &&
                        <div className='flex flex-row justify-start item-center gap-2 my-5'>
                            <button type='button' className={styles.btn} onClick={submitUpdateProfile}>Guardar</button>
                            <button type='button' className={styles.btn} onClick={doCancel}>Cancelar</button>
                        </div>
                    }
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.tabs}>
                        <div className='flex gap-8'>
                            <a
                                className={showStatusBar ? styles.activeTab : styles.tabItem}
                                onClick={() => setActiveView(VIEW_STATES.USER)}>
                                Perfil
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
                                    Tutorías
                                </a>
                            }
                        </div>
                        {(isCurrentUserProfile && activeView !== VIEW_STATES.EDIT) &&
                            <a
                                className={`${activeView === VIEW_STATES.EDIT ? styles.activeTab : styles.editTab}`}
                                onClick={() => setActiveView(VIEW_STATES.EDIT)}>
                                Editar perfil &gt;
                            </a>
                        }
                    </div>
                    <div className={styles.tabContent}>
                        {activeView === VIEW_STATES.USER &&
                            <UserInfo
                                isCurrentUserProfile={isCurrentUserProfile}
                                {...formState} />
                        }
                        {activeView === VIEW_STATES.COURSE &&
                            <Courses items={courses}/>
                        }
                        {activeView === VIEW_STATES.POSTS &&
                            <Publications items={posts}/>
                        }
                        {activeView === VIEW_STATES.ARCHIVE &&
                            <Publications items={archivePosts}/>
                        }
                        {activeView === VIEW_STATES.EDIT &&
                            <EditProfile
                                profile={formState}
                                onChange={onChange}
                                setProfile={setFormState}
                                errorState={errorForm}/>
                        }
                    </div>
                </div>
            </div>
            <Loader show={showLoadingScreen}/>
        </Main>
    );
}

const styles = {
    mainContainer: 'mb-8 flex flex-row gap-8',
    leftContainer: 'flex flex-col w-[300px] justify-between item-center',
    rightContainer: 'flex flex-col gap-6 w-full',
    avatarCard: 'card text-gray-400 bg-secondary rounded-none h-[300px] w-[300px] flex flex-col justify-center items-center',
    tabs: 'tabs border-transparent border-b-black border-b-[1px] w-full justify-between',
    tabItem: 'tab font-normal text-black text-2xl px-0 hover:text-primary',
    activeTab: 'tab font-normal text-2xl tab-active text-other px-0',
    editTab: 'text-other font-normal pr-0 tab text-2xl px-0 hover:text-primary',
    tabContent: 'border-none pb-4',
    btn: 'btn bg-other text-white hover:bg-primary btn-md rounded-full',
    fileInput: 'input hidden input-ghost w-full',
    fileLabel: 'label-text text-lg border-2 border-transparent py-2 rounded-none border-b-black',
};

export const getServerSideProps = withSession(async function ({req}) {
    const currentUser = req.session.get('user');
    console.log({currentUser})
    if (!currentUser) {
        return {props: {}};
    }
    const urlSplit = req.url.split('/');
    const userIdParam = urlSplit[urlSplit.length - 1];
    const isCurrentUserProfile = userIdParam === DEFAULT_USER_ID && currentUser;
    const isProfessor = isUserProfessor(currentUser.role?.id);
    const profileId = isCurrentUserProfile ? currentUser.id : userIdParam
    const profileQuery = isCurrentUserProfile ?
        query.user.GET_PRIVATE_USER_PROFILE : query.user.GET_PUBLIC_USER_PROFILE;

    const {user: profile, allCourses, allPosts: posts} = await request([
        profileQuery(profileId),
        (isProfessor && isCurrentUserProfile) ?
            query.user.GET_USER_COURSES(profileId) : query.user.GET_STUDENT_COURSES(profileId),
        query.user.GET_USER_POSTS(profileId)
    ]);

    let archivePosts = {};
    if (isProfessor && isCurrentUserProfile) {
        const profesorCourses = allCourses.filter(course => course.professor.id === profileId).map(course => course.id);
        archivePosts = await request(
            query.posts.GET_PROFESOR_COURSES_POSTS(profesorCourses)
        );
    }
    return {
        props: {
            profile,
            courses: allCourses,
            posts: posts,
            archivePosts: archivePosts.allPosts || [],
            isProfessor
        }
    };
});

export default Profile;
