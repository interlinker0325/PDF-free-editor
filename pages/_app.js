import React from 'react'
import Head from 'next/head'
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import LoginModal from 'components/LoginModal/LoginModal';
import {useState} from 'react';
import {SWRConfig} from 'swr';
import fetchJson from 'utils/fetchJson';
import useUser from 'utils/useUser';

import 'tailwindcss/tailwind.css'
import 'global.css'
import "./Editor.css"
import "../components/Compliance/Compliance.module.css"

function MyApp({Component, pageProps}) {
  const [displayModal, setDisplayModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const closeModal = () => setDisplayModal(false);
  const {mutateUser, user = {}} = useUser();

  const sessionText = `${user.isLoggedIn ? 'Cerrar' : 'Iniciar'} sesión`;
  const doLogout = async () => {
    mutateUser(
        await fetchJson('/api/logout', {method: 'POST'}),
        false,
    );
    closeModal();
    location.href = '/';
  };

  const sessionAction = user.isLoggedIn ? doLogout : () => setDisplayModal(true);
  const navItems = user.isLoggedIn ? [
    {name: 'Mi perfil', action: '/profile/me'},
    {name: 'Crear publicación', action: '/posts/new'},
    {name: 'Crear publicación', action: '/posts/new', isAction: true, isMobile: true},
    {name: sessionText, onClick: sessionAction}
  ] : [
    {name: sessionText, onClick: sessionAction, isAction: true}
  ];

  const title = typeof Component?.pageTitle === 'string' ? `${Component.pageTitle} | ADLYCEUM` : 'ADLYCEUM';
  return (
      <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              console.error(err);
            },
          }}>
        <Head>
          <title>{title}</title>
          <link rel='icon' href='/favicon.ico'/>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <meta name='robots' content='noindex'></meta>
          <link rel='preconnect' href='https://fonts.googleapis.com'/>
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true'/>
        </Head>
        <div className='flex flex-col items-stretch justify-items-stretch overflow-y-auto relative mt-24'>
          {!Component.hideNav ?
              <Header user={user} items={navItems} isSaved={isSaved} setIsSaved={setIsSaved}/> : null}
          <Component {...pageProps} isSaved={isSaved} setIsSaved={setIsSaved}/>
          {!Component.hideFooter ?
              <Footer/> : null}
        </div>
        {displayModal && <LoginModal onClose={closeModal} display={displayModal}/>}
      </SWRConfig>
  );
}

export default MyApp
