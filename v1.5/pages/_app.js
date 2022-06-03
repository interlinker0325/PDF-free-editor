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
        console.log('OVER HERE!!');
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
    console.log('OVER HERE!!!', user, navItems);
    return (
        <React.Fragment>
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
                </Head>
                {!Component.hideNav ?
                    <Header items={navItems}/> : null}
                <Component {...pageProps} />
                {!Component.hideFooter ?
                    <Footer items={navItems} /> : null}

                {displayModal && <LoginModal onClose={closeModal} display={displayModal}/>}
            </SWRConfig>
        </React.Fragment>
    );
}

export default MyApp
