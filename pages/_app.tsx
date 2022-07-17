import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { DAppProvider } from '@usedapp/core';
import { Provider } from 'react-redux';

import { DAPP_CONFIG } from '../config';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DAppProvider config={DAPP_CONFIG}>
        <Component {...pageProps} />
      </DAppProvider>
    </Provider>
  );
}

export default MyApp;
