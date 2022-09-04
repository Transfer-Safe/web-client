import '../styles/global.scss';
import '@rainbow-me/rainbowkit/styles.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { WagmiConfig } from 'wagmi';

import { getWagmiClient, generateTheme } from '../config';
import store from '../store';
import createEmotionCache from '../utils/createEmotionCache';
import AppRainbowKitProvider from '../components/AppRainbowKitProvider';
import { useCurrentChain } from '../hooks';

const clientSideEmotionCache = createEmotionCache();

const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const chain = useCurrentChain();
  return (
    <ThemeProvider theme={generateTheme(chain.id)}>{children}</ThemeProvider>
  );
};

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache?: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      <Provider store={store}>
        <WagmiConfig client={getWagmiClient()}>
          <AppThemeProvider>
            <AppRainbowKitProvider>
              <Component {...pageProps} />
            </AppRainbowKitProvider>
          </AppThemeProvider>
        </WagmiConfig>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
