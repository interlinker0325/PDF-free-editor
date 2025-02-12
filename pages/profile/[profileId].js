import React, {useCallback, useEffect, useRef, useState} from 'react'
import {updateProfile} from 'handlers/profile';
import {upload} from 'handlers/bll';
import withSession from 'utils/withSession';
import {request} from 'utils/graphqlRequest';
import {query} from 'gql';
import Main from 'components/Main/Main';
import {useRouter} from 'next/router';
import {INPUT_TYPES, verifyMutipleFields} from 'utils/form';

import {isAdmin as isUserAdmin, isProfessor as isUserProfessor, POST_REVIEW_STATUS} from 'utils';
import useUser from "../../utils/useUser";

import UserInfo from 'components/Profile/UserInfo';
import Courses from 'components/Profile/Courses';
import Publications from 'components/Profile/Publications';
import Loader from 'components/Loader/Loader';
import ContentTabs from 'components/Profile/Tabs'

import styles from 'components/Profile/styles'

const DEFAULT_USER_ID = 'me'

const DEFAULT_ERRORFORM = {field: null, msg: null};

function Profile({profile = {}, courses = [], posts = [], archivePosts = [], isAdmin = false}) {
  const {user} = useUser({redirectTo: '/'})
  const router = useRouter();
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [formState, setFormState] = useState(profile || {});
  const [errorForm, setErrorForm] = useState(DEFAULT_ERRORFORM);
  const [avatarImage, setAvatarImage] = useState(null);
  const [activeModeEdit, setActiveModeEdit] = useState(true)
  const {query: {profileId}} = useRouter();
  const isCurrentUserProfile = profileId === DEFAULT_USER_ID;
  const refs = {
    avatar: useRef()
  };

  useEffect(() => {
    if (!profile) router.push('/');
  }, [profile]);

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
    try {
      const isFileInput = refs[name]?.current?.files;
      if (isFileInput) {
        triggerLoading(true);

        const _files = refs[name].current.files;
        const itemValue = await upload(_files, true, profile?.avatar?.id);
        console.log({itemValue})
        // Preview the image
        if (_files?.length && FileReader) {
          const fileReader = new FileReader();
          fileReader.onload = () => setAvatarImage(fileReader.result);
          fileReader.readAsDataURL(_files[0]);
        }

        triggerLoading(false);
        updateFormState(name, itemValue);
        return;
      }

      // Handle non-file inputs
      let itemValue =
          typeof e === "boolean" ? e : e.target.value;

      if (name === INPUT_TYPES.PHONE) {
        itemValue = /^\d*[.]?\d*$/.test(itemValue) ? itemValue : formState[name];
      }
      console.log({name, itemValue})
      updateFormState(name, itemValue);
    } catch (e) {
      console.error("Algo salio mal", e)
    } finally {
      triggerLoading(false);
    }
  }, [formState, refs, profile?.avatar?.id]);

  const updateFormState = (name, value) => {
    setFormState(prevState => ({...prevState, [name]: value,}));
  };

  const submitUpdateProfile = useCallback(async (e) => {
    e.preventDefault();
    triggerLoading(true);
    const {
      id,
      role,
      fullname,
      email,
      phone,
      avatar,
      birthdate,
      gender,
      residence,
      level,
      sharing,
      experience,
      updatedAt
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
      experience,
      sharing,
      ...(avatar?.id ? {avatar: avatar?.id} : null),
    });

    if (entry.error) {
      alert('No se pudo actualizar la entrada');
    } else {

      if (avatar?.id) {
        entry.avatar = avatar
        entry.updatedAt = updatedAt
        setActiveModeEdit(true)
      }

      setFormState({...entry});
    }
    triggerLoading(false);
  }, [formState]);

  const doCancel = useCallback(async (e) => {
    setFormState(profile);
    setAvatarImage(null);
  }, [profile])

  const actionsTabs = [
    {
      name: 'Perfil',
      value: 'profile',
      component: <UserInfo
          isCurrentUserProfile={isCurrentUserProfile}
          avatarView={avatarImage || formState?.avatar?.url}
          submitUpdateProfile={submitUpdateProfile}
          doCancel={doCancel}
          onChange={onChange}
          setProfile={setFormState}
          errorState={errorForm}
          refAvatar={refs}
          items={posts.filter(item => item.review !== POST_REVIEW_STATUS.DRAFT)}
          user={user}
          activeView={activeModeEdit}
          setActiveView={setActiveModeEdit}
          {...formState} />
    },
    {
      name: 'Cursos',
      value: 'courses',
      component: <Courses items={courses}/>
    },
    {
      name: 'Borradores',
      value: 'drafts',
      action: 'animationend',
      component: <Publications itemsPerPage={10} items={posts.filter(item => item.review === POST_REVIEW_STATUS.DRAFT)}
                               label={"Borradores"} user={user}/>
    },
    {
      name: 'Tutorías',
      value: 'tutorials',
      component: <Publications itemsPerPage={10} items={archivePosts} label={"Tutorías"} user={user} isAdmin={isAdmin}/>
    },
  ]

  return (
      <Main className="pt-[unset] p-[unset]">
        <div className={styles.contProfile}>
          <div className={styles.rightContainer}>
            <div className={styles.tabs}>
              <ContentTabs data={actionsTabs}/>
            </div>
          </div>
        </div>
        <Loader show={showLoadingScreen}/>
      </Main>
  );
}

export const getServerSideProps = withSession(async function ({req}) {
  const currentUser = req.session.get('user');
  if (!currentUser) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const urlSplit = req.url.split('/');
  const userIdParam = urlSplit[urlSplit.length - 1];
  const isCurrentUserProfile = userIdParam === DEFAULT_USER_ID && currentUser;
  const isProfessor = isUserProfessor(currentUser.role?.id);
  const isAdmin = isUserAdmin(currentUser.role?.id);
  const profileId = isCurrentUserProfile ? currentUser.id : userIdParam
  const profileQuery = isCurrentUserProfile ?
      query.user.GET_PRIVATE_USER_PROFILE : query.user.GET_PUBLIC_USER_PROFILE;

  const {user: profile, allCourses, allPosts: posts} = await request([
    profileQuery(profileId),
    (isProfessor && isCurrentUserProfile) ?
        query.user.GET_USER_COURSES(profileId) : query.user.GET_STUDENT_COURSES(profileId),
    query.user.GET_USER_POSTS(profileId)
  ]);
  let archivePosts = {allPosts: []};
  if (isAdmin && isCurrentUserProfile) {
    archivePosts = await request(query.posts.GET_ADMIN_COURSES_POSTS());
  } else if (isProfessor && isCurrentUserProfile) {
    const profesorCourses = allCourses.filter(course => course?.professor?.id === profileId).map(course => course.id);
    archivePosts = await request(
        query.posts.GET_PROFESOR_COURSES_POSTS(profesorCourses)
    );
  }

  return {
    props: {
      profile,
      courses: allCourses,
      posts: posts,
      archivePosts: archivePosts?.allPosts || [],
      isProfessor,
      isAdmin
    }
  };
});

export default Profile;
