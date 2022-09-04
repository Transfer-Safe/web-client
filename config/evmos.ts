import { providers } from 'ethers';
import { Chain } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

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
      url: 'https://evm.evmos.dev',
    },
  },
  nativeCurrency: {
    decimals: 9,
    name: 'TEVMOS',
    symbol: 'TEVMOS',
  },
};

export const evmostChain: Chain = {
  id: 9001,
  name: 'Evmos',
  rpcUrls: {
    default: 'https://eth.bd.evmos.org:8545',
  },
  network: 'evmos',
  testnet: true,
  blockExplorers: {
    default: {
      name: 'BlockScout',
      url: 'https://evm.evmos.org',
    },
  },
  nativeCurrency: {
    decimals: 9,
    name: 'EVMOS',
    symbol: 'EVMOS',
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
    if (chain.id === 9001) {
      return {
        http: 'https://eth.bd.evmos.org:8545',
        // webSocket: 'wss://eth.bd.evmos.org:8546',
      };
    }
    return null;
  },
});

export const evmosTestEthersProvider = new providers.JsonRpcProvider({
  url: 'https://eth.bd.evmos.dev:8545',
});

export const evmosEthersProvider = new providers.JsonRpcProvider({
  url: 'https://eth.bd.evmos.org:8545',
});
