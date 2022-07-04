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

    const sessionText = `${user.isLoggedIn ? 'Cerrar' : 'Iniciar'} sesión`;
    const doLogout = async (e) => {
        e.preventDefault();
        mutateUser(
            await fetchJson('/api/logout', { method: 'POST' }),
            false,
        );
        closeModal();
        location.href = '/';
    };

    const sessionAction = user.isLoggedIn ? doLogout : () => setDisplayModal(true);
    const navItems = user.isLoggedIn ? [
        { name: 'Inicio', action: '/' },
        { name: 'Mi perfil', action: '/profile/me' },
        { name: 'Crear publicación', action: '/posts/new' },
        { name: sessionText, onClick: sessionAction }
    ] : [
        { name: 'Inicio', action: '/' },
        { name: sessionText, onClick: sessionAction }
    ];

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
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;900&family=bigCaslon+Two+Text:wght@100;200;300;400;500;600;700;900&display=swap" rel="stylesheet" />
                <style>{`
                    .htmlBackgroundBackdrop {
                        overflow: hidden;
                        background-color: rgba(0, 0, 0, 0.1);
                    }
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
