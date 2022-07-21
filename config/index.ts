import { Config, Mumbai } from '@usedapp/core';

export * from './contractAddress';

export const DAPP_CONFIG: Config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]:
      'https://polygon-mumbai.g.alchemy.com/v2/a101DcPx_NnzBc7UxX_fumhk3OEV69Kb',
  },
  networks: [Mumbai],
};
