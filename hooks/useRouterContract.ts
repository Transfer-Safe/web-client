import {
  TransferSafeRouter__factory,
  TransferSafeRouter,
} from '@transfer-safe/router';
import { Chain } from '@usedapp/core';
import { Contract, utils } from 'ethers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getRouterContractAddress } from '../config';
import { RootState } from '../store/rootReducer';

export type RouterContact = Contract & Pick<TransferSafeRouter, 'functions'>;

export const useRouterContract = (): RouterContact &
  Pick<TransferSafeRouter, 'functions'> => {
  const chain = useSelector<RootState, Chain>(({ settings }) => settings.chain);
  const contractAddress = getRouterContractAddress(chain.chainId);
  const contract = useMemo(() => {
    const wethInterface = new utils.Interface(TransferSafeRouter__factory.abi);
    return new Contract(contractAddress, wethInterface);
  }, [contractAddress]);

  return contract as RouterContact;
};
