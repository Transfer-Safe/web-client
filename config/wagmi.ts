import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, defaultChains } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider, webSocketProvider } = configureChains(
  [...defaultChains, chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_APIKEY })],
);

const { connectors } = getDefaultWallets({
  appName: 'TransferSafe',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});
