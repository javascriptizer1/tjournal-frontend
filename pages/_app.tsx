import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store, {wrapper} from "../store";
import {parseCookies} from "nookies";
import {userApi} from "../api/user";
import {setUserData} from "../store/slices/user";
import {Api} from "../api";
import Head from "next/head";
import Script from "next/script";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <link rel="stylesheet" href="../styles/globals.css"/>
            <title>TJournal</title>
        </Head>
        <Script strategy={'beforeInteractive'} src="https://use.fontawesome.com/8dd572c34b.js"/>
        <Component {...pageProps} />
    </>
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component}) => {
    try {
        const userData = await Api(ctx).user.me();
        store.dispatch(setUserData(userData));
    } catch (e) {
        console.log(e);
        store.dispatch(setUserData(null));
    }
    return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {},
    };
});

export default wrapper.withRedux(MyApp);
