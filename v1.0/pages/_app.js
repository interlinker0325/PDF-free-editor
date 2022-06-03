import { theme, SITE_FONT_SIZE } from 'styles/theme';
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import Head from 'next/head';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { useState } from 'react';
import LoginModal from 'components/Modals/LoginModal';
import { SWRConfig } from 'swr';
import fetchJson from 'utils/fetchJson';
import useUser from 'utils/useUser';

const MyApp = ({ Component, pageProps }) => {
    const [modalState, setModalState] = useState(false);
    const openCloseModal = () => setModalState(!modalState);
    const { mutateUser } = useUser();

    const doLogout = async (e) => {
        e.preventDefault();
        mutateUser(
            await fetchJson('/api/logout', { method: 'POST' }),
            false,
        );
    };

    const navItems = (isLoggedIn) => ([
        { display: true, isLogout: false, href: '/', children: 'Inicio' },
        { display: true, isLogout: false, href: '/course', children: 'Curso' },
        { display: true, isLogout: isLoggedIn, onClick: isLoggedIn ? doLogout : openCloseModal, children: `${isLoggedIn ? 'Cerrar' : 'Iniciar'} Session` },
        { display: isLoggedIn, isLogout: false, href: '/posts/new', children: 'Crear Contenido' }
    ]);

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>{Component.pageTitle ? `${Component.pageTitle} | ` : ''}ADLYCEUM</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="robots" content="noindex"></meta>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700;900&family=bigCaslon+Two+Text&display=swap" rel="stylesheet" />
            </Head>
            <Global styles={theme => ({
                '@font-face': {
                    fontFamily: theme.fonts.bigCalslom,
                    src: 'url("/fonts/bigCaslonmedium-webfont.woff2") format("woff2"), url("/fonts/bigCaslonmedium-webfont.woff") format("woff")',
                    fontWeight: 'normal',
                    fontStyle: 'normal'
                },
                '*': {
                    boxSizing: 'border-box'
                },
                'i > svg': {
                    maxHeight: '2rem'
                },
                'html, body': {
                    width: '100vw',
                    margin: '0 auto',
                    fontSize: SITE_FONT_SIZE,
                    overflow: 'auto',
                    overflowX: 'hidden',
                    fontFamily: 'system-ui, sans-serif',
                    lineHeight: '1.5',
                    maxWidth: '1280px'
                },
                'svg path': { transition: 'fill ease .5s' },
                '::-webkit-scrollbar': { display: 'none' }
            })} />
            <SWRConfig
                value={{
                    fetcher: fetchJson,
                    onError: (err) => {
                        console.error(err);
                    },
                }}>
                <Header items={navItems} />
                <Component {...pageProps} />
                <Footer items={navItems} />

                {modalState &&
                    <LoginModal
                        display={modalState}
                        onClose={() => openCloseModal()} />
                }
            </SWRConfig>
        </ThemeProvider>
    );
}

export default MyApp;
