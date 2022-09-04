import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { Chain, chain, configureChains, createClient } from 'wagmi';
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

export const getWagmiConfig = (hostName?: string) => {
  let enabledChains: Chain[] = [];

  switch (hostName) {
    case 'evmos.transfersafe.net':
      enabledChains = [evmostTestChain];
      break;
    default:
      enabledChains = [chain.polygonMumbai, evmostTestChain];
  }

  const { chains, provider, webSocketProvider } = configureChains(
    enabledChains,
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

  return { chains, provider, webSocketProvider, connectors };
};

export const getWagmiClient = (hostName: string) => {
  const { provider, webSocketProvider, connectors } = getWagmiConfig(hostName);
  return createClient({
    autoConnect: true,
    connectors: () => [...connectors()],
    provider,
    webSocketProvider,
  });
};
