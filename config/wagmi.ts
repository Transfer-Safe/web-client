import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const defaultProvider = alchemyProvider({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_APIKEY,
});

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
  [defaultProvider],
);

const { connectors } = getDefaultWallets({
  appName: 'TransferSafe',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
