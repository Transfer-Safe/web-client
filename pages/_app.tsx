import '../styles/global.scss';
import '@rainbow-me/rainbowkit/styles.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { WagmiConfig } from 'wagmi';

import { theme, wagmiClient } from '../config';
import store from '../store';
import createEmotionCache from '../utils/createEmotionCache';
import AppRainbowKitProvider from '../components/AppRainbowKitProvider';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache?: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <WagmiConfig client={wagmiClient}>
            <AppRainbowKitProvider>
              <Component {...pageProps} />
            </AppRainbowKitProvider>
          </WagmiConfig>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
