import { TransferSafeRouter } from '@transfer-safe/router';
import { Contract } from 'ethers';
import { useSelector } from 'react-redux';

import { getRouterContractAddress } from '../config';
import { RootState } from '../store/rootReducer';

export type RouterContact = Contract & Pick<TransferSafeRouter, 'functions'>;

export const useRouterContractAddress = (): string => {
  const chainId = useSelector<RootState, number>(
    ({ settings }) => settings.chainId,
  );
  const contractAddress = getRouterContractAddress(chainId);
  return contractAddress;
};
