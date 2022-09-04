import { ethers } from 'ethers';

import { evmosEthersProvider, evmosTestEthersProvider } from './evmos';

export const getEthersProvider = (chainId: number) => {
  switch (chainId) {
    case 9000:
      return evmosTestEthersProvider;
    case 9001:
      return evmosEthersProvider;
    default:
      return new ethers.providers.AlchemyProvider(
        ethers.providers.getNetwork(chainId),
        process.env.ALCHEMY_APIKEY,
      );
  }
};
