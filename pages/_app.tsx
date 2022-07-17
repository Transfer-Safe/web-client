import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { DAppProvider } from '@usedapp/core';
import { Provider } from 'react-redux';

import { DAPP_CONFIG } from '../config';
import store from '../store';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <DAppProvider config={DAPP_CONFIG}>
          <Component {...pageProps} />
        </DAppProvider>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
