import { Chain } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { providers } from 'ethers';

export const evmostTestChain: Chain = {
  id: 9000,
  name: 'Evmos Test',
  rpcUrls: {
    default: 'https://eth.bd.evmos.dev:8545',
  },
  network: 'evmos-test',
  testnet: true,
  blockExplorers: {
    default: {
      name: 'BlockScout',
      url: 'https://evm.evmos.org',
    },
  },
  nativeCurrency: {
    decimals: 9,
    name: 'TEVMOS',
    symbol: 'TEVMOS',
  },
};

export const evmosProvider = jsonRpcProvider({
  rpc(chain) {
    if (chain.id === 9000) {
      return {
        http: 'https://eth.bd.evmos.dev:8545',
        webSocket: 'wss://eth.bd.evmos.dev:8546',
      };
    }
    return null;
  },
});

export const evmosTestProvider = new providers.JsonRpcProvider({
  url: 'https://eth.bd.evmos.dev:8545',
});
