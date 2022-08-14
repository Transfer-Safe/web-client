import { ethers } from 'ethers';

export const getEthersProvider = (chainId: number) =>
  new ethers.providers.AlchemyProvider(
    ethers.providers.getNetwork(chainId),
    process.env.NEXT_PUBLIC_ALCHEMY_APIKEY,
  );
