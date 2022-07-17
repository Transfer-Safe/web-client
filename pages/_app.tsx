import { NextUIProvider } from '@nextui-org/react';
import { DAppProvider } from '@usedapp/core';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import { DAPP_CONFIG } from '../config';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <NextUIProvider>
        <Provider store={store}>
          <DAppProvider config={DAPP_CONFIG}>
            <Component {...pageProps} />
          </DAppProvider>
        </Provider>
      </NextUIProvider>
    </React.Fragment>
  );
}

export default MyApp;
