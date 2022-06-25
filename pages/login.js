import React from 'react';
import { request } from 'graphql-request';
import { gqlConfig, SESSIONS } from '../gql';
import Main from 'components/Main/Main';
import LoginForm from 'components/Forms/LoginForm';
import RegisterForm from 'components/Forms/RegisterForm';
import Logo from 'components/Logo/Logo';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'login',
            session: null,
            userData: null
        };

        // this.getSession = this.getSession.bind(this);
        // this.setSession = this.setSession.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    // async getSession() {
    //     const data = await request(gqlConfig.API_URL, SESSIONS.get());
    //     this.setState({ session: data });
    // }

    // setSession() {}

    setActiveTab(label) {
        this.setState({ activeTab: label });
    }

    doLogin(e, data) {
        e.preventDefault();
        // console.log('OVER HERE!!! form', data);
    }

    render() {
        const {
            activeTab,
            session,
            userData
        } = this.state;
        const isLoginPage = activeTab === 'login';

        // console.log('OVER HERE!!!', session, this.props);
        return (
            <Main>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.card}>
                            <Logo className={styles.logo} size='150' />
                            <div className={styles.tabs}>
                                <button
                                    onClick={this.setActiveTab('login')}
                                    className={`${styles.tab} ${isLoginPage ? styles.activeTab : ''}`}>login</button>
                                <button
                                    onClick={this.setActiveTab('register')}
                                    className={`${styles.tab} ${!isLoginPage ? styles.activeTab : ''}`}>register</button>
                            </div>

                            {isLoginPage ? (
                                <LoginForm onSubmit={(e, data) => this.doLogin(e, data)} />
                            ) : (
                                <RegisterForm onSubmit={() => alert('submited register')} />
                            )}
                        </div>
                    </div>
                </div>
            </Main>
        );
    }
}

const styles = {
    wrapper: 'hero min-h-fit pt-16',
    content: 'hero-content text-center min-w-max',
    card: 'card rounded-lg shadow-xl flex flex-col justify-center align-center py-4',
    logo: 'py-4 bg-primary rounded-t-lg',
    tabs: 'tabs w-full flex flex-row align-center justify-center mb-4',
    tab: 'tab h-1/4 py-2 uppercase text-l w-1/2 font-bold',
    activeTab: 'tab-bordered border-b-primary text-primary'
};