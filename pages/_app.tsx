import '../styles/global.scss';
import '@rainbow-me/rainbowkit/styles.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { chain, WagmiConfig } from 'wagmi';

import { chains, theme, wagmiClient } from '../config';
import store from '../store';
import createEmotionCache from '../utils/createEmotionCache';

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
            <RainbowKitProvider
              chains={chains}
              theme={lightTheme({
                accentColor: theme.palette.primary.main,
                borderRadius: 'small',
              })}
              // TODO: proper chain
              initialChain={chain.polygonMumbai}
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiConfig>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
