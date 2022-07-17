import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DAppProvider } from '@usedapp/core'
import { DAPP_CONFIG } from '../config'

function MyApp({ Component, pageProps }: AppProps) {
  return <DAppProvider config={DAPP_CONFIG}>
    <Component {...pageProps} />
  </DAppProvider>
}

export default MyApp
