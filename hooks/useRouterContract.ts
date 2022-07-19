import { TransferSafeRouter__factory } from '@transfer-safe/router';
import { Chain } from '@usedapp/core';
import { Contract, utils } from 'ethers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getContractAddress } from '../config';
import { RootState } from '../store/rootReducer';

export const useRouterContract = (): Contract => {
  const chain = useSelector<RootState, Chain>(({ settings }) => settings.chain);
  const contractAddress = getContractAddress(chain.chainId);
  const contract = useMemo(() => {
    const wethInterface = new utils.Interface(TransferSafeRouter__factory.abi);
    return new Contract(contractAddress, wethInterface);
  }, [contractAddress]);

  return contract;
};
