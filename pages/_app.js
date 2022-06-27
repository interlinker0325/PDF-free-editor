import React from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import LoginModal from 'components/LoginModal/LoginModal';
import { useState } from 'react';
import { SWRConfig } from 'swr';
import fetchJson from 'utils/fetchJson';
import useUser from 'utils/useUser';

function MyApp({ Component, pageProps }) {
    const [displayModal, setDisplayModal] = useState(false);
    const closeModal = () => setDisplayModal(false);
    const { mutateUser, user = {} } = useUser();

    const sessionText = `${user.isLoggedIn ? 'Cerrar' : 'Iniciar'} Sesión`;
    const doLogout = async (e) => {
        e.preventDefault();
        mutateUser(
            await fetchJson('/api/logout', { method: 'POST' }),
            false,
        );
        closeModal();
    };

    const sessionAction = user.isLoggedIn ? doLogout : () => setDisplayModal(true);
    const navItems = [
        { name: 'Inicio', action: '/' },
        { name: 'Crear Publicación', action: '/posts/new' },
        { name: 'Mi Perfil', action: '/profile/me' },
        { name: sessionText, onClick: sessionAction }
    ]

    return (
        <SWRConfig
            value={{
                fetcher: fetchJson,
                onError: (err) => {
                    console.error(err);
                },
            }}>
            <Head>
                <title>{Component.pageTitle ? `${Component.pageTitle} | ` : ''}ADLYCEUM</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="robots" content="noindex"></meta>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&family=bigCaslon+Two+Text&display=swap" rel="stylesheet" />
                <style>{`
                    @font-face {
                        font-family: "big_caslonmedium";
                        src: 'url("/fonts/bigCaslonmedium-webfont.woff2") format("woff2"), url("/fonts/bigCaslonmedium-webfont.woff") format("woff")';
                        font-weight: normal;
                        font-style: normal;
                    };

                    * {
                        box-sizing: border-box;
                    };

                    i > svg {
                        max-height: 2rem;
                    };

                    html, body {
                        width: 100vw;
                        margin: 0 auto;
                        font-size: 15px;
                        overflow: auto;
                        overflow-x: hidden;
                        font-family: system-ui, sans-serif;
                        lineHeight: 1.5;
                    };

                    svg path {
                        transition: fill ease .5s;
                    };
                `}</style>
            </Head>
            <div className='flex flex-col items-stretch justify-items-stretch overflow-y-auto'>
                {!Component.hideNav ?
                    <Header items={navItems}/> : null}
                <Component {...pageProps} />
                {!Component.hideFooter ?
                    <Footer /> : null}
            </div>
            {displayModal && <LoginModal onClose={closeModal} display={displayModal}/>}
        </SWRConfig>
    );
}

export default MyApp
