import '../styles/globals.css';

import { DAppProvider } from '@usedapp/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import { DAPP_CONFIG } from '../config';
import store from '../store';

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
