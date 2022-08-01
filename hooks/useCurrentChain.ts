import { Chain, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core';
import { useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';

export const useCurrentChain = (): Chain => {
  const currentChainId = useSelector<RootState, number>(
    (state) => state.settings.chainId,
  );
  const chain = DEFAULT_SUPPORTED_CHAINS.find(
    (c) => c.chainId === currentChainId,
  );
  if (!chain) {
    throw new Error(`Chain with id ${currentChainId} not found`);
  }
  return chain;
};
