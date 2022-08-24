import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { sequenceWallet } from 'sequence-rainbowkit-wallet';

import { evmosProvider } from './evmos';

const defaultProvider = alchemyProvider({
  apiKey: process.env.ALCHEMY_APIKEY,
});

export const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai,
    // TODO: enable evmos
    // evmostTestChain,
  ],
  [defaultProvider, evmosProvider],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      sequenceWallet({ chains }),
      wallet.metaMask({ chains }),
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
    ],
  },
]);

export const getWagmiClient = () =>
  createClient({
    autoConnect: true,
    connectors: () => [...connectors()],
    provider,
    webSocketProvider,
  });
