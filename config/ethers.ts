import { ethers } from 'ethers';

import { evmosTestProvider } from './evmos';

export const getEthersProvider = (chainId: number) => {
  switch (chainId) {
    case 9000:
      return evmosTestProvider;
    default:
      return new ethers.providers.AlchemyProvider(
        ethers.providers.getNetwork(chainId),
        process.env.ALCHEMY_APIKEY,
      );
  }
};
