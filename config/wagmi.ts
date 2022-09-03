import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { sequenceWallet } from 'sequence-rainbowkit-wallet';

import { evmosProvider, evmostTestChain } from './evmos';

const failSaveAlchemyProvider = () => {
  const p = alchemyProvider({
    apiKey: process.env.ALCHEMY_APIKEY,
  });
  return (...args: Parameters<typeof p>) => {
    const result = p(...args);
    if (result) {
      if (typeof window === 'undefined') {
        result.webSocketProvider = undefined;
      }
    }
    return result;
  };
};

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai, evmostTestChain],
  [failSaveAlchemyProvider(), evmosProvider],
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
